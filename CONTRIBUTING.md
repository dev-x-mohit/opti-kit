# Contributing to OptiKit

First off, **thank you** for considering contributing to OptiKit! 🎉

Whether you're fixing a bug, adding a new utility function, improving documentation, or just fixing a typo — every contribution matters and is deeply appreciated.

---

## 🚀 Quick Start

```bash
# 1. Fork and clone the repo
git clone https://github.com/<your-username>/opti-kit.git
cd opti-kit

# 2. Install dependencies
npm install

# 3. Build the core package
npm run build:package

# 4. Run tests
npm run test:package

# 5. Start the showcase dev server (optional)
npm run dev -w apps/showcase
```

---

## 📁 Project Structure

```text
opti-kit/
├── packages/
│   └── opti-kit/          # Core library (this is what gets published to NPM)
│       ├── src/            # Source files — add new utilities here
│       ├── dist/           # Build output (auto-generated)
│       └── package.json
├── apps/
│   └── showcase/           # Interactive demo website
├── .github/
│   └── workflows/          # CI/CD pipelines
└── package.json            # Root workspace config
```

---

## 🎯 What Can You Contribute?

### Good First Issues 🏷️
Look for issues labeled [`good first issue`](https://github.com/dev-x-mohit/opti-kit/labels/good%20first%20issue) — these are specifically picked for newcomers.

### Types of Contributions
| Type | Description |
|---|---|
| 🐛 **Bug Fix** | Fix a broken utility or incorrect behavior |
| ✨ **New Utility** | Add a new function to an existing module |
| 📝 **Documentation** | Improve README, JSDoc comments, or examples |
| 🧪 **Tests** | Add missing unit tests for existing utilities |
| 🎨 **Showcase** | Improve the interactive demo website |
| 🔧 **Tooling** | Improve build, CI/CD, or developer experience |

---

## 📝 How to Add a New Utility

1. **Pick the right module** — Check `packages/opti-kit/src/` for existing modules (e.g., `string.ts`, `array.ts`, `math.ts`)
2. **Write your function** — Add it to the appropriate module file:
   ```typescript
   /**
    * Describe what your function does.
    * @param input - Description of the parameter
    * @returns Description of the return value
    * @example
    * ```ts
    * myNewFunction('hello'); // 'HELLO'
    * ```
    */
   export function myNewFunction(input: string): string {
     return input.toUpperCase();
   }
   ```
3. **Export it** — Make sure it's exported from `src/index.ts`
4. **Add tests** — Create or update the test file for that module
5. **Build & test**:
   ```bash
   npm run build:package
   npm run test:package
   ```

---

## ✅ Contribution Guidelines

- **Zero dependencies** — Never add external runtime dependencies. This is a core principle of OptiKit.
- **TypeScript only** — All code must be written in TypeScript with proper type annotations.
- **Pure functions** — Utilities should be side-effect free whenever possible.
- **Include tests** — Every new function should have at least 2–3 unit tests.
- **JSDoc comments** — Add clear JSDoc with `@param`, `@returns`, and `@example`.
- **Descriptive names** — Function names should be self-explanatory.

---

## 🔀 Pull Request Process

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feat/my-new-utility`
3. **Make your changes** following the guidelines above
4. **Test everything**: `npm run test:package`
5. **Commit** with a clear message: `feat: add reverseWords to string module`
6. **Push** and open a Pull Request

### Commit Message Format
```
feat: add new utility function
fix: correct edge case in deepClone
docs: improve README examples
test: add missing tests for array module
chore: update build configuration
```

---

## 🤝 Code of Conduct

- Be respectful and constructive in all interactions
- Welcome newcomers — everyone was a beginner once
- Focus on the code, not the person
- Assume good intentions

---

## 💬 Questions?

- **GitHub Issues**: [Open an issue](https://github.com/dev-x-mohit/opti-kit/issues)
- **Developer**: [Mohit Lakhara](https://mohitlakhara.vercel.app)

---

**Happy contributing!** Every PR, no matter how small, makes OptiKit better for the entire community. 🚀
