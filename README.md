# Kalyar Soe Myat Htwe — Professional Developer Portfolio

Modern, high-performance, responsive personal developer portfolio showcasing enterprise software engineering, backend architecture, cloud data migrations, and full-stack web applications.

---

## 🌟 Key Highlights

- **Aesthetic & Modern UI**: Built with a sleek dark/light mode switcher, glassmorphism cards, glowing ambient meshes, and smooth micro-interactions.
- **Production-Tested Projects**:
  - **CareViewer Cloud SaaS Platform**: Enterprise nursing & eldercare management platform serving facilities across Japan (`www.careviewer.jp`) built with Laravel, PHP, and Docker.
  - **Modern Thread E-Commerce**: Zero-dependency Python inventory and retail management engine with multi-variant SKUs, coupon calculation, and automated test coverage.
  - **Enterprise Employee REST API**: High-throughput RESTful API with token authentication, normalized SQL models, and OpenAPI/Postman documentation.
  - **AWS to Sakura Cloud Migration**: Zero-downtime database migration of historical Japanese healthcare records with verified ETL checksums.
- **Interactive Features**:
  - Live role typewriter header animation
  - Filterable project grid (Enterprise SaaS, Python & Systems, APIs & Backend, Cloud & ETL)
  - Interactive deep-dive modal viewer for technical architecture and challenges
  - Email copy-to-clipboard with instant toast notifications
  - Responsive drawer menu for mobile and tablet devices
  - Clean print stylesheet for CV/resume exporting

---

## 🛠️ Built With

- **HTML5 & CSS3**: Semantic markup and modern CSS custom variables.
- **Tailwind CSS**: Utility-first responsive design framework.
- **Vanilla Modern JavaScript (ES6+)**: Zero bulky framework dependencies for maximum performance (100/100 Lighthouse performance).
- **Lucide Icons**: Crisp, clean vector icon set.
- **Google Fonts**: `Outfit` (Headings), `Inter` (Body typography), and `JetBrains Mono` (Code & badges).

---

## 🚀 Running Locally

Because this project uses vanilla web technologies and CDN assets, you can run it immediately with zero installation:

### Option 1: Python HTTP Server
```bash
# Navigate to the portfolio folder
cd portfolio

# Start Python's built-in web server
python -m http.server 8080
```
Then open `http://localhost:8080` in your web browser.

### Option 2: VS Code Live Server
Right-click on `index.html` inside VS Code and select **Open with Live Server**.

### Option 3: Node `serve` / `npx`
```bash
npx serve .
```

---

## 🌐 Deploying to GitHub Pages

To make this live on your custom GitHub Pages URL (`https://kalyarsoe.github.io`):

1. **Create the GitHub Repository**:
   - Create a repository named `kalyarsoe.github.io` (for root user domain) or `portfolio`.
2. **Push Code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of modern personal portfolio"
   git branch -M main
   git remote add origin https://github.com/kalyarsoe/portfolio.git  # or kalyarsoe.github.io
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repository on GitHub: **Settings** → **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Set **Branch** to `main` and folder to `/(root)`.
   - Click **Save**.
   - Your site will be live within 60 seconds!

---

## 👤 Author

**Kalyar Soe Myat Htwe**
- **GitHub**: [@kalyarsoe](https://github.com/kalyarsoe)
- **Specialization**: Full-Stack Web Development, Laravel & PHP, Python, Cloud Databases & Migrations
- **Languages**: English (Professional), Burmese (Native)
