import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoDir = path.resolve(__dirname, "..");

function run(cmd) {
  console.log(`\n==> [CMD]: ${cmd}`);
  try {
    const out = execSync(cmd, { cwd: repoDir, encoding: "utf8", stdio: "pipe" });
    console.log(out || "(no output)");
    return { ok: true, out };
  } catch (err) {
    console.error(`Error (${err.status}):`, err.stderr || err.stdout || err.message);
    return { ok: false, err };
  }
}

console.log("==> Checking git status in:", repoDir);
run("git status --short");

console.log("==> Adding all changes...");
run("git add .");

console.log("==> Committing...");
run('git commit -m "feat: mobile & tablet optimizations, dark glassmorphism contact form, dedicated mobile vision roadmap, cloudinary CDN media integration, and lineup scroll stabilization"');

console.log("==> Pushing to remote rsi (https://github.com/RSI-One/m1-wesbite.git)...");
run("git push rsi main");

console.log("==> Pushing to remote origin (https://github.com/RSI-One/m1-wesbite.git)...");
run("git push origin main");
