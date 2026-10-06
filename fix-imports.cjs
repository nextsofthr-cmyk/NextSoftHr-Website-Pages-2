const fs = require("fs");
const path = require("path");
const fsp = require("fs/promises");

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, "src", "components");

async function fixImports(dir, projectName) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await fixImports(fullPath, projectName);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      let content = await fsp.readFile(fullPath, "utf8");
      let changed = false;

      // When placed in components/ProjectName/, they are 1 level deeper relative to src/.
      // So a prior `from '../data/...'` goes to `from '../../data/ProjectName/...'`
      // But wait: some components might be nested deeper like components/ProjectName/ui/Button.tsx.
      // We know they were moved exactly 1 level deeper.
      // So any relative import starting with `.` or `..` needs to either be adjusted, OR
      // simpler: we just globally replace `from '../data/` with `from '../../data/ProjectName/`
      // ONLY if there are exactly `../` instances that meant `src/`.
      // Actually, since all imports out of the folder were just `../data/` or `../components/` or `../context/`

      // Let's adjust imports dynamically.
      const lines = content.split("\n");
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (
          line.includes("from '../data/") ||
          line.includes("import '../data/")
        ) {
          // It used to go from src/components/ -> src/data/
          // Now it's in src/components/Refund/ -> we want src/data/refund/
          // ProjectName is lowercase/kebab like "refund"
          // Wait, did we copy data to src/data/refund ? Yes.
          line = line.replace(
            /['"]\.\.\/data\//g,
            `"../../data/${projectName}/`,
          );
          changed = true;
        }

        if (
          line.includes("from '../components/") ||
          line.includes("import '../components/")
        ) {
          // It used to be ../components/ -> which is itself!
          // If a component in src/components imported ../components/X (weird but possible),
          // Now we want to point to ../../components/${projectName}/X (or just ./X if it was in the same folder).
          // Usually `../components/` means it was in a subfolder `src/components/ui/` pointing to `src/components/X`.
          line = line.replace(
            /['"]\.\.\/components\//g,
            `"../../components/${projectName}/`,
          );
          changed = true;
        }

        if (
          line.includes("from '../context/") ||
          line.includes("import '../context/")
        ) {
          // Contexts were merged to src/context, so we just add one more `../`
          line = line.replace(/['"]\.\.\/context\//g, `"../../context/`);
          changed = true;
        }

        if (
          line.includes("from './data/") ||
          line.includes("import './data/")
        ) {
          // sometimes it might mistakenly refer to ./data
          // ... but wait, we only want to fix ../data
        }

        lines[i] = line;
      }

      if (changed) {
        await fsp.writeFile(fullPath, lines.join("\n"), "utf8");
        console.log(`Fixed imports in ${fullPath}`);
      }
    }
  }
}

async function run() {
  const dirs = await fsp.readdir(componentsDir, { withFileTypes: true });
  for (let dir of dirs) {
    if (dir.isDirectory()) {
      // dir.name is like "refund", "about-us"
      await fixImports(path.join(componentsDir, dir.name), dir.name);
    }
  }
  console.log("Import fixes complete!");
}

run().catch(console.error);
