import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const codeDir = path.resolve(__dirname, "..");

process.env.NEXT_TELEMETRY_DISABLED = "1";
process.env.PORT = "3000";

const nextBin = path.join(codeDir, "node_modules", "next", "dist", "bin", "next");

console.log("[Dev Runner] Launching Next.js from:", nextBin);
console.log("[Dev Runner] Working directory:", codeDir);

const child = spawn(process.execPath, [nextBin, "dev", "--webpack"], {
  cwd: codeDir,
  env: { ...process.env },
  stdio: ["ignore", "pipe", "pipe"],
});

child.stdout.on("data", (data) => {
  process.stdout.write(data);
});

child.stderr.on("data", (data) => {
  process.stderr.write(data);
});

child.on("exit", (code, signal) => {
  console.log(`[Dev Runner] Child exited with code ${code}, signal ${signal}`);
  process.exit(code ?? 0);
});
