import { readFileSync, writeFileSync, existsSync } from "fs";

const path =
  "./node_modules/@tanstack/start-storage-context/dist/esm/async-local-storage.js";

if (existsSync(path)) {
  let content = readFileSync(path, "utf8");
  if (content.includes('from "node:async_hooks"')) {
    content = content.replace(
      `import { AsyncLocalStorage } from "node:async_hooks";`,
      `const AsyncLocalStorage = globalThis.AsyncLocalStorage ?? class { run(_, fn) { return fn(); } getStore() { return undefined; } };`
    );
    writeFileSync(path, content);
    console.log("✅ Patched @tanstack/start-storage-context successfully");
  } else {
    console.log("ℹ️ Patch already applied or not needed");
  }
} else {
  console.log("⚠️ File not found, skipping patch");
}
