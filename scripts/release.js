const { execSync } = require("child_process");
const path = require("path");
const pkg = require(path.join(__dirname, "../packages/opti-kit/package.json"));
const version = `v${pkg.version}`;

console.log(`\n🚀 Releasing ${version}...`);

try {
  execSync(`git tag ${version}`, { stdio: "inherit" });
  console.log(`✅ Tag ${version} created`);
} catch {
  console.error(`❌ Tag ${version} already exists or git tag failed`);
  process.exit(1);
}

execSync(`git push origin ${version}`, { stdio: "inherit" });
console.log(`✅ Tag ${version} pushed → GitHub Actions will publish to NPM automatically!\n`);
