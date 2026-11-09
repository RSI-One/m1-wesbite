import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function main() {
  console.log("==> Verifying Cloudinary connection for gf2v9kfu...");
  try {
    const ping = await cloudinary.api.ping();
    console.log("✅ Cloudinary connected successfully:", ping);
  } catch (err) {
    console.error("❌ Cloudinary connection failed:", err);
    process.exit(1);
  }

  const filesToUpload = [
    {
      localPath: path.join(rootDir, "public", "videos", "hero.mp4"),
      publicId: "m1-aviation/videos/hero",
      resourceType: "video",
    },
    {
      localPath: path.join(rootDir, "public", "videos", "siaos-background.mp4"),
      publicId: "m1-aviation/videos/siaos-background",
      resourceType: "video",
    },
    {
      localPath: path.join(rootDir, "public", "models", "bombardier_windjet_365_fast.glb"),
      publicId: "m1-aviation/models/bombardier_windjet_365_fast.glb",
      resourceType: "raw",
    },
  ];

  const results = {};

  for (const item of filesToUpload) {
    if (!fs.existsSync(item.localPath)) {
      console.warn(`⚠️ File not found: ${item.localPath}`);
      continue;
    }

    const stat = fs.statSync(item.localPath);
    console.log(`\n==> Uploading ${path.basename(item.localPath)} (${(stat.size / 1024 / 1024).toFixed(2)} MB)...`);

    try {
      const uploadRes = await cloudinary.uploader.upload(item.localPath, {
        public_id: item.publicId,
        resource_type: item.resourceType,
        overwrite: true,
        use_filename: true,
        unique_filename: false,
      });

      console.log(`✅ Uploaded successfully: ${uploadRes.secure_url}`);
      results[path.basename(item.localPath)] = uploadRes.secure_url;
    } catch (uploadErr) {
      console.error(`❌ Failed to upload ${item.localPath}:`, uploadErr);
    }
  }

  // Write mapping to public/cdn-urls.json
  const outputPath = path.join(rootDir, "data", "cdn-urls.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\n🎉 All uploads complete! Mapping written to ${outputPath}`);
}

main();
