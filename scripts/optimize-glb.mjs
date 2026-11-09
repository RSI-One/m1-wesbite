import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelPath = path.resolve(__dirname, "../public/models/bombardier_windjet_365_fast.glb");
const backupPath = path.resolve(__dirname, "../public/models/bombardier_windjet_365_fast.glb.bak");

async function optimizeGlb() {
  console.log("==> Reading GLB from:", modelPath);
  const data = fs.readFileSync(modelPath);
  
  if (!fs.existsSync(backupPath)) {
    fs.writeFileSync(backupPath, data);
    console.log("✅ Backup created at:", backupPath);
  }

  const magic = data.readUInt32LE(0);
  const version = data.readUInt32LE(4);
  const length = data.readUInt32LE(8);

  const jsonChunkLen = data.readUInt32LE(12);
  const jsonChunkType = data.readUInt32LE(16);
  const jsonBuffer = data.subarray(20, 20 + jsonChunkLen);
  const gltf = JSON.parse(jsonBuffer.toString("utf8"));

  const binChunkHeaderPos = 20 + jsonChunkLen;
  const binChunkLen = data.readUInt32LE(binChunkHeaderPos);
  const binChunkType = data.readUInt32LE(binChunkHeaderPos + 4);
  const binBuffer = data.subarray(binChunkHeaderPos + 8, binChunkHeaderPos + 8 + binChunkLen);

  console.log(`Original JSON length: ${jsonChunkLen}, BIN length: ${binChunkLen} (${(binChunkLen/1024/1024).toFixed(2)} MB)`);

  if (!gltf.images || gltf.images.length === 0) {
    console.log("No images to optimize.");
    return;
  }

  // Optimize each image buffer
  const newBufferViews = [...gltf.bufferViews];
  const imageBuffers = [];

  // We'll collect all buffers: mesh data buffers + new image buffers
  // First, find which bufferViews belong to images
  const imageBufferViewIndices = new Set(gltf.images.map(img => img.bufferView));

  // Map of old bufferView index -> buffer slice
  const nonImageBuffers = [];
  // To preserve alignment, rebuild bin buffer
  let currentOffset = 0;
  const updatedBufferViews = [];

  for (let i = 0; i < gltf.bufferViews.length; i++) {
    const bv = gltf.bufferViews[i];
    const isImage = imageBufferViewIndices.has(i);

    if (!isImage) {
      const slice = binBuffer.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength);
      // Align 4 bytes
      const padding = (4 - (slice.length % 4)) % 4;
      const paddedSlice = padding > 0 ? Buffer.concat([slice, Buffer.alloc(padding)]) : slice;

      updatedBufferViews[i] = {
        ...bv,
        byteOffset: currentOffset,
        byteLength: slice.length,
      };
      nonImageBuffers.push(paddedSlice);
      currentOffset += paddedSlice.length;
    }
  }

  console.log(`==> Optimizing ${gltf.images.length} textures...`);
  for (let i = 0; i < gltf.images.length; i++) {
    const img = gltf.images[i];
    const bv = gltf.bufferViews[img.bufferView];
    const rawImageBuf = binBuffer.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength);

    let optimizedBuf;
    let newMimeType = img.mimeType;

    try {
      const metadata = await sharp(rawImageBuf).metadata();
      // Resize textures if larger than 1024px
      const targetWidth = metadata.width && metadata.width > 1024 ? 1024 : undefined;
      const targetHeight = metadata.height && metadata.height > 1024 ? 1024 : undefined;

      let pipeline = sharp(rawImageBuf);
      if (targetWidth || targetHeight) {
        pipeline = pipeline.resize(targetWidth, targetHeight, { fit: "inside" });
      }

      if (img.mimeType === "image/png" && !metadata.hasAlpha) {
        // If PNG has no alpha, convert to high quality JPEG
        optimizedBuf = await pipeline.jpeg({ quality: 84 }).toBuffer();
        newMimeType = "image/jpeg";
      } else if (img.mimeType === "image/png") {
        optimizedBuf = await pipeline.png({ compressionLevel: 9, quality: 85 }).toBuffer();
      } else {
        optimizedBuf = await pipeline.jpeg({ quality: 82 }).toBuffer();
        newMimeType = "image/jpeg";
      }
    } catch (e) {
      console.warn(`Failed to optimize image ${i}, keeping original:`, e.message);
      optimizedBuf = rawImageBuf;
    }

    // Ensure 4-byte alignment
    const pad = (4 - (optimizedBuf.length % 4)) % 4;
    const finalBuf = pad > 0 ? Buffer.concat([optimizedBuf, Buffer.alloc(pad)]) : optimizedBuf;

    updatedBufferViews[img.bufferView] = {
      buffer: 0,
      byteOffset: currentOffset,
      byteLength: optimizedBuf.length,
    };
    img.mimeType = newMimeType;

    nonImageBuffers.push(finalBuf);
    currentOffset += finalBuf.length;
  }

  const newBinBuffer = Buffer.concat(nonImageBuffers);
  gltf.bufferViews = updatedBufferViews;
  gltf.buffers[0].byteLength = newBinBuffer.length;

  const newJsonStr = JSON.stringify(gltf);
  const jsonPadding = (4 - (Buffer.byteLength(newJsonStr) % 4)) % 4;
  const paddedJsonStr = newJsonStr + " ".repeat(jsonPadding);
  const newJsonBuffer = Buffer.from(paddedJsonStr, "utf8");

  const totalLength = 12 + 8 + newJsonBuffer.length + 8 + newBinBuffer.length;
  const glbHeader = Buffer.alloc(12);
  glbHeader.writeUInt32LE(0x46546c67, 0); // glTF
  glbHeader.writeUInt32LE(2, 4);          // version 2
  glbHeader.writeUInt32LE(totalLength, 8); // total length

  const jsonHeader = Buffer.alloc(8);
  jsonHeader.writeUInt32LE(newJsonBuffer.length, 0);
  jsonHeader.writeUInt32LE(0x4e4f534a, 4); // JSON

  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(newBinBuffer.length, 0);
  binHeader.writeUInt32LE(0x004e4942, 4); // BIN\0

  const finalGlb = Buffer.concat([glbHeader, jsonHeader, newJsonBuffer, binHeader, newBinBuffer]);

  fs.writeFileSync(modelPath, finalGlb);
  console.log(`\n🎉 GLB Optimization Complete!`);
  console.log(`Original: ${(data.length / 1024 / 1024).toFixed(2)} MB`);
  console.log(`New:      ${(finalGlb.length / 1024 / 1024).toFixed(2)} MB`);
}

optimizeGlb().catch(console.error);
