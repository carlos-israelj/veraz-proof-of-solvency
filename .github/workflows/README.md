# GitHub Actions Workflows

## Automatic Deployment to GitHub Pages

### Overview

This repository uses GitHub Actions to automatically deploy the frontend to GitHub Pages whenever changes are pushed to the `main` branch.

**Workflow File**: `deploy.yml`

---

## How It Works

### Trigger Events

The deployment workflow runs automatically on:

1. **Push to `main` branch**
   ```bash
   git push origin main
   ```
   → Triggers automatic build and deployment

2. **Manual trigger** (via GitHub UI)
   - Go to: https://github.com/carlos-israelj/veraz-proof-of-solvency/actions
   - Select "Deploy to GitHub Pages"
   - Click "Run workflow"

---

## Workflow Steps

```mermaid
graph LR
    A[Push to main] --> B[Checkout code]
    B --> C[Setup Node.js 20]
    C --> D[Install dependencies]
    D --> E[Build project]
    E --> F[Deploy to gh-pages]
    F --> G[Site updated]
```

### Detailed Steps

1. **Checkout Repository**
   - Uses: `actions/checkout@v4`
   - Fetches latest code from `main` branch

2. **Setup Node.js**
   - Uses: `actions/setup-node@v4`
   - Version: Node.js 20
   - Caches npm dependencies for faster builds

3. **Install Dependencies**
   - Command: `npm ci`
   - Clean install from `package-lock.json`
   - Ensures reproducible builds

4. **Build Project**
   - Command: `npm run build`
   - Runs Vite build process
   - Outputs to `dist/` directory
   - Bundles all assets, WASM files, and optimizes code

5. **Deploy to gh-pages**
   - Uses: `peaceiris/actions-gh-pages@v4`
   - Pushes `dist/` contents to `gh-pages` branch
   - GitHub Pages serves from this branch
   - Automatic commit message with SHA

---

## Benefits of Automated Deployment

### Before (Manual Process) ❌

```bash
# Every time you made changes:
1. npm run build                    # Build locally
2. git checkout gh-pages            # Switch branch
3. rm -rf assets *.html *.js        # Clean old files
4. cp -r dist/* .                   # Copy new build
5. git add -A && git commit -m "..." # Commit
6. git push origin gh-pages         # Push
7. git checkout main                # Back to main
```

**Time**: ~2-3 minutes per deployment
**Error-prone**: Easy to forget steps or make mistakes

### After (Automated) ✅

```bash
# Just commit and push to main:
git add .
git commit -m "feat: new feature"
git push origin main

# Done! Deployment happens automatically
```

**Time**: ~30 seconds (just git commands)
**Reliable**: Same process every time, no human error

---

## Monitoring Deployments

### View Workflow Status

1. **GitHub Actions Tab**
   - URL: https://github.com/carlos-israelj/veraz-proof-of-solvency/actions
   - See all workflow runs
   - Check build logs
   - View deployment status

2. **Commit Status Badges**
   - Green checkmark ✅: Deployment successful
   - Red X ❌: Deployment failed
   - Yellow circle 🟡: Deployment in progress

### Typical Deployment Timeline

```
Push to main         →  0:00
Workflow triggered   →  0:05
Dependencies install →  0:30
Build completes      →  1:50
Deploy to gh-pages   →  2:10
Site live            →  2:30-3:00

Total: ~2-3 minutes from push to live site
```

---

## Troubleshooting

### Deployment Failed

**Check the logs**:
1. Go to Actions tab
2. Click on failed workflow run
3. Expand failed step
4. Read error message

**Common issues**:

#### Build Errors
```
Error: Build failed with exit code 1
```

**Solution**:
- Check that `npm run build` works locally
- Review build errors in logs
- Fix code issues and push again

#### Permission Errors
```
Error: Resource not accessible by integration
```

**Solution**:
- Check repository Settings → Actions → General
- Ensure "Workflow permissions" = "Read and write permissions"

#### Node Version Mismatch
```
Error: Unsupported Node.js version
```

**Solution**:
- Update `node-version` in `deploy.yml` to match your local version

---

## Configuration

### Workflow Settings

Located in: `.github/workflows/deploy.yml`

**Key configurations**:

```yaml
on:
  push:
    branches:
      - main  # Trigger on main branch pushes

permissions:
  contents: write    # Allow pushing to gh-pages
  pages: write       # Allow updating Pages
  id-token: write    # For deployment authentication

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest  # Use Ubuntu runner

    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: '20'  # Node.js version
          cache: 'npm'         # Cache npm packages

      - run: npm ci            # Clean install
      - run: npm run build     # Build command

      - uses: peaceiris/actions-gh-pages@v4
        with:
          publish_dir: ./dist        # Directory to deploy
          publish_branch: gh-pages   # Target branch
```

---

## Customization

### Change Build Command

```yaml
- name: Build project
  run: npm run build:production  # Custom build script
```

### Add Build Optimizations

```yaml
- name: Build project
  run: |
    npm run build
    npm run optimize-images
    npm run compress-assets
```

### Deploy to Different Branch

```yaml
- uses: peaceiris/actions-gh-pages@v4
  with:
    publish_branch: production  # Deploy to 'production' instead
```

### Add Deployment Notifications

```yaml
- name: Notify deployment success
  if: success()
  run: |
    echo "Deployment successful!"
    # Add Slack/Discord notification here
```

---

## Manual Deployment (Backup Method)

If GitHub Actions is unavailable, you can still deploy manually:

```bash
# 1. Build locally
npm run build

# 2. Install gh-pages package (one-time)
npm install -D gh-pages

# 3. Add script to package.json:
# "deploy": "gh-pages -d dist"

# 4. Deploy
npm run deploy
```

Or use the manual process we used earlier (documented in git history).

---

## Security Considerations

### Secrets and Tokens

- **No secrets needed**: Uses built-in `GITHUB_TOKEN`
- Token is automatically provided by GitHub
- Limited scope: only repository access
- Expires after workflow completes

### Permissions

The workflow requires:
- `contents: write` - To push to gh-pages branch
- `pages: write` - To trigger Pages deployment
- `id-token: write` - For OIDC authentication

These are minimal permissions for the deployment task.

---

## Performance Optimizations

### Caching

The workflow uses npm caching:
```yaml
cache: 'npm'  # Caches node_modules
```

**Impact**:
- First build: ~60 seconds (install dependencies)
- Subsequent builds: ~20 seconds (cached dependencies)

### Concurrency

```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```

- Only one deployment runs at a time
- Queues multiple pushes
- Prevents conflicts

---

## Comparison with Other Solutions

| Method | Setup Time | Deploy Time | Automation | Reliability |
|--------|------------|-------------|------------|-------------|
| **GitHub Actions** | 5 min | 2-3 min | ✅ Full | ✅ High |
| Manual gh-pages | 0 min | 3-5 min | ❌ None | 🟡 Medium |
| Vercel/Netlify | 10 min | 1-2 min | ✅ Full | ✅ High |
| Self-hosted | 30+ min | 1-2 min | ⚙️ Custom | 🟡 Medium |

**Recommendation**: GitHub Actions (current setup)
- Free for public repos
- Integrated with repository
- No external dependencies
- Standard industry practice

---

## Best Practices

### 1. Always Test Locally First

```bash
# Before pushing:
npm run build  # Ensure build works
npm run preview  # Test built site
```

### 2. Use Conventional Commits

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve deployment issue"
git commit -m "docs: update README"
```

### 3. Monitor Deployment Status

- Check Actions tab after each push
- Don't push multiple times if deployment is in progress
- Wait for green checkmark before testing

### 4. Version Your Deployments

The workflow includes commit SHA in deployment message:
```
deploy: automatic deployment from a1b2c3d
```

You can roll back by checking out a previous gh-pages commit.

---

## Rollback Procedure

If a deployment breaks the site:

```bash
# 1. Find last working deployment
git log origin/gh-pages

# 2. Revert to that commit
git checkout gh-pages
git reset --hard <commit-sha>
git push origin gh-pages --force

# 3. Verify site is working
# Visit https://veraz-pos.xyz/

# 4. Fix the issue in main branch
# Push fix, which will trigger new deployment
```

---

## Resources

- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **peaceiris/actions-gh-pages**: https://github.com/peaceiris/actions-gh-pages
- **Workflow Syntax**: https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions

---

**Last Updated**: 2026-09-30
**Workflow Version**: 1.0
**Status**: ✅ Active and Tested
