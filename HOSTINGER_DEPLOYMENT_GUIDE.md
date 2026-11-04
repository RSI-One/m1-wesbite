# Hostinger Deployment Guide for M1 Aviation Website

Because this website is built with **Next.js (App Router)** and contains **server-side API routes** (such as `/api/admin/auth`), it requires a **Node.js runtime** to execute. It cannot simply be uploaded as plain HTML/CSS into a traditional `public_html` folder.

Here is the complete guide on environment variables, required server settings, and step-by-step setup for Hostinger.

---

## 1. Required Environment Variables

You must add these environment variables in your Hostinger panel (under **Environment Variables**) or in a `.env.production` / `.env.local` file in your application root:

| Variable | Description | Value |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Your production website URL (used for SEO, metadata, canonical URLs) | `https://m1.rsinternational.net` |
| `ADMIN_EMAIL_1` | Primary editorial administrator email | `Inquireareez@gmail.com` |
| `ADMIN_PASS_1` | Primary administrator password | `Areez#AeroOps99!` |
| `ADMIN_EMAIL_2` | Secondary administrator email | `Founder@rsinternational.net` |
| `ADMIN_PASS_2` | Secondary administrator password | `RSI_Founder#M1Alpha2026!` |
| `ADMIN_SESSION_SECRET` | Secret key used for cryptographic token generation | `m1_aero_cms_secret_key_2026_99x` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Web server port *(Hostinger often assigns this automatically)* | `3000` *(or Hostinger assigned port)* |

---

## 2. Required Server Settings

1. **Node.js Version**:
   * **Minimum required**: **Node.js 20.x** (or **Node.js 22.x LTS**).
   * *Do NOT use Node 16 or 18*, as this project uses Next.js 16 and React 19 which will fail on older runtimes.
2. **Package Manager**:
   * `npm` or `pnpm` (run `npm install --production=false` so devDependencies like Tailwind, TypeScript, and PostCSS are present during the build step).
3. **Build & Start Commands**:
   * **Build Command**: `npm run build` *(executes `next build --webpack`)*
   * **Start Command**: `npm run start` *(or `node_modules/next/dist/bin/next start`)*
4. **SSL / HTTPS**:
   * Enable Hostinger's free **Let's Encrypt SSL certificate** for `m1.rsinternational.net` in hPanel so all 3D assets, API calls, and auth cookies run securely over HTTPS.

---

## 3. Setup Depending on Your Hostinger Plan

Hostinger offers two main types of plans for running Node.js applications:

### Option A: Hostinger Web / Cloud Hosting (using hPanel Node.js Application)

If your Hostinger plan includes the **Node.js** feature in hPanel:

1. **Log in to Hostinger hPanel**:
   * Go to **Websites** > select your site > find **Node.js** in the left sidebar.
2. **Create / Configure Node.js Application**:
   * **Node.js version**: Choose **20.x** (or highest LTS available).
   * **Application mode**: `Production`.
   * **Application root**: `/` (or directory where your files are uploaded).
   * **Application startup file**: `node_modules/next/dist/bin/next` (with argument `start`) or create a minimal `server.js` if required by your specific hPanel template.
3. **Deploy the Code**:
   * Connect your GitHub repository directly via **Git** in hPanel:
     * **Repository**: `https://github.com/RSI-One/m1-wesbite.git`
     * **Branch**: `main`
   * Or upload the project files (exclude `node_modules` and `.next`).
4. **Add Environment Variables**:
   * In hPanel under the **Environment Variables** section or by creating a `.env.production` file in your project root with the variables listed in section 1 above.
5. **Install & Build**:
   * Run via the hPanel console or SSH:
     ```bash
     npm install
     npm run build
     ```
6. **Start the Application**: Click **Restart Application** in hPanel.

---

### Option B: Hostinger VPS (Virtual Private Server) — Most Common for Next.js

If you have a Hostinger VPS (Ubuntu / Debian):

1. **SSH into your VPS**:
   ```bash
   ssh root@<YOUR_HOSTINGER_SERVER_IP>
   ```

2. **Install Node.js 20+ & PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs git
   sudo npm install -g pm2
   ```

3. **Clone the Repo & Install Dependencies**:
   ```bash
   git clone https://github.com/RSI-One/m1-wesbite.git /var/www/m1-website
   cd /var/www/m1-website
   npm install
   ```

4. **Create the Environment File**:
   ```bash
   nano .env.local
   ```
   Paste the variables from **Section 1** and save (`Ctrl + O`, `Enter`, `Ctrl + X`).

5. **Build and Run with PM2**:
   ```bash
   npm run build
   pm2 start npm --name "m1-website" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx (Reverse Proxy)**:
   Point port `80`/`443` to `http://localhost:3000` so visitors see the website directly when visiting `https://m1.rsinternational.net`.

---

## 4. Summary Checklist Before Launch

- [ ] Node.js version set to **20.x** or higher.
- [ ] `.env.local` / environment variables configured (with `NEXT_PUBLIC_SITE_URL="https://m1.rsinternational.net"`).
- [ ] Ran `npm run build` cleanly (uses Webpack to avoid container Turbopack crashes).
- [ ] Verified SSL certificate is active on `https://m1.rsinternational.net`.
- [ ] Verified `/api/admin/auth` is responding to authenticate your admin accounts.
