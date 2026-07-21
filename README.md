# OptiKit Monorepo

> A zero-dependency, ultra-lightweight, and fully tree-shakeable JavaScript/TypeScript utility library — built as a professional npm Workspaces monorepo.

[![NPM Version](https://img.shields.io/npm/v/@dev_x_mohit/opti-kit?style=flat-square&color=a855f7)](https://www.npmjs.com/package/@dev_x_mohit/opti-kit)
[![Socket Security](https://img.shields.io/badge/Socket%20Security-100%2F100-success?style=flat-square)](https://socket.dev/npm/package/@dev_x_mohit/opti-kit)
[![Bundlephobia Size](https://img.shields.io/badge/Minified%20%2B%20Gzip-14%20KB-blue?style=flat-square)](https://bundlephobia.com/package/@dev_x_mohit/opti-kit)
[![CI/CD](https://github.com/dev-x-mohit/opti-kit/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/dev-x-mohit/opti-kit/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Developer](https://img.shields.io/badge/Developer-Mohit%20Lakhara-a855f7?style=flat-square)](https://mohitlakhara.vercel.app)

---

## Workspace Structure

```text
opti-kit/
├── packages/
│   └── opti-kit/          # Core library → published to NPM
├── apps/
│   └── showcase/          # Interactive showcase website → deployed to Vercel
├── .github/
│   └── workflows/
│       ├── npm-publish.yml    # Auto-publishes to NPM on version tag
│       └── vercel-deploy.yml  # Auto-deploys showcase on push to main
├── vercel.json            # Vercel monorepo build config
├── LICENSE
└── package.json           # Root workspace config
```

---

## Packages & Apps

- 📦 Core Package: [`@dev_x_mohit/opti-kit`](./packages/opti-kit)
- 🌐 Showcase Site: [opti-kit-showcase.vercel.app](https://opti-kit-showcase.vercel.app)

---

## CI/CD Automation

The monorepo features fully automated publishing and deployments via GitHub Actions:

- **NPM Auto-Publish:** Every time a version tag is pushed, the `npm-publish.yml` workflow automatically builds, tests, and publishes the package to NPM.
- **Vercel Auto-Deploy:** Every push to `main` automatically builds and deploys the showcase site to Vercel.

**To release a new version:**
```bash
# 1. Bump version in packages/opti-kit/package.json
# 2. Run the release command (bypasses manual tag and push steps)
npm run release
```

---

## Local Development

Get started with the project locally:

```bash
# Clone the repo
git clone https://github.com/dev-x-mohit/opti-kit.git
cd opti-kit

# Install all workspace dependencies
npm install

# Build the core package
npm run build:package

# Start the showcase dev server
npm run dev -w apps/showcase

# Run all tests
npm run test:package
```

---

## Links

- 📦 **NPM**: [npmjs.com/package/@dev_x_mohit/opti-kit](https://www.npmjs.com/package/@dev_x_mohit/opti-kit)
- 🌐 **Showcase**: [opti-kit-showcase.vercel.app](https://opti-kit-showcase.vercel.app)
- 👨‍💻 **Developer**: [mohitlakhara.vercel.app](https://mohitlakhara.vercel.app)
- 🐛 **Issues**: [github.com/dev-x-mohit/opti-kit/issues](https://github.com/dev-x-mohit/opti-kit/issues)

---

## License

MIT © [Mohit Lakhara](https://mohitlakhara.vercel.app)

