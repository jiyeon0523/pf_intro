# JIYEON KIM — Portfolio

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm ci
npm run build
npm run preview
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages whenever changes are pushed to `main` (or when run manually).

For the `jiyeon0523/pf_intro` repository, the production build automatically uses `/pf_intro/` as its public base path. Local development continues to use `/`.

After the first successful workflow run, make sure the repository's **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**.
