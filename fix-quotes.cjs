const fs = require("fs");
const path = require("path");
const fsp = require("fs/promises");

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, "src", "components");

async function fixQuotes(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await fixQuotes(fullPath);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      let content = await fsp.readFile(fullPath, "utf8");
      let changed = false;

      const lines = content.split("\n");
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // If it starts a string with " but ends with '
        if (line.includes('from "') || line.includes('import "')) {
          // check if line ends with '; or '
          // It might have trailing spaces or semicolon
          if (line.match(/from\s+"[^"]+'\s*;?\s*$/)) {
            line = line.replace(/'(\s*;?\s*)$/, '"$1');
            changed = true;
          }
          if (line.match(/import\s+"[^"]+'\s*;?\s*$/)) {
            line = line.replace(/'(\s*;?\s*)$/, '"$1');
            changed = true;
          }
        }

        lines[i] = line;
      }

      if (changed) {
        await fsp.writeFile(fullPath, lines.join("\n"), "utf8");
      }
    }
  }
}

fixQuotes(componentsDir)
  .then(() => console.log("Quotes fixed"))
  .catch(console.error);
