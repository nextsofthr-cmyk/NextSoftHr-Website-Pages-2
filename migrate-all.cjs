const fs = require("fs");
const path = require("path");
const fsp = require("fs/promises");

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");
const pagesDir = path.join(srcDir, "pages");
const componentsDir = path.join(srcDir, "components");
const dataDir = path.join(srcDir, "data");

function toPascalCase(str) {
  return str
    .split(/[- _&]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function normalizeName(str) {
  return str.replace(/[ &]+/g, "-").toLowerCase();
}

async function run() {
  await fsp.mkdir(pagesDir, { recursive: true });
  await fsp.mkdir(componentsDir, { recursive: true });
  await fsp.mkdir(dataDir, { recursive: true });

  const entries = await fsp.readdir(rootDir, { withFileTypes: true });

  const subprojects = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (
      entry.name === "node_modules" ||
      entry.name === "src" ||
      entry.name.startsWith(".")
    )
      continue;

    const spSrcDir = path.join(rootDir, entry.name, "src");
    if (
      fs.existsSync(spSrcDir) &&
      fs.existsSync(path.join(spSrcDir, "App.tsx"))
    ) {
      subprojects.push(entry.name);
    }
  }

  const importedPages = [];

  for (let sp of subprojects) {
    const normalizedSp = normalizeName(sp);
    const spDir = path.join(rootDir, sp);
    const spSrcDir = path.join(spDir, "src");

    const pageName = toPascalCase(sp);
    const pageDirDest = path.join(pagesDir, pageName);
    await fsp.mkdir(pageDirDest, { recursive: true });

    // 1. Copy App.tsx
    const appTsxPath = path.join(spSrcDir, "App.tsx");
    const indexTsxPath = path.join(pageDirDest, "index.tsx");
    let hasRouteContext = false;

    if (fs.existsSync(appTsxPath)) {
      let content = await fsp.readFile(appTsxPath, "utf8");

      // Update component imports
      content = content.replace(
        /from\s+['"]\.\/components\//g,
        `from '../../components/${normalizedSp}/`,
      );
      content = content.replace(
        /import\s+['"]\.\/components\//g,
        `import '../../components/${normalizedSp}/`,
      );

      // Update data imports
      content = content.replace(
        /from\s+['"]\.\/data\//g,
        `from '../../data/${normalizedSp}/`,
      );

      // Update context imports
      content = content.replace(
        /from\s+['"]\.\/context\//g,
        `from '../../context/`,
      );

      // Rename App to <PageName>Page
      content = content.replace(
        /export default function App\b/g,
        `export default function ${pageName}Page`,
      );
      content = content.replace(/const App =/g, `const ${pageName}Page =`);
      content = content.replace(
        /export default App\b/g,
        `export default ${pageName}Page`,
      );

      await fsp.writeFile(indexTsxPath, content, "utf8");
      console.log(
        `Copied ${sp}/src/App.tsx -> src/pages/${pageName}/index.tsx`,
      );

      importedPages.push({ name: pageName, path: normalizedSp });
    }

    // 2. Copy components
    const spCompDir = path.join(spSrcDir, "components");
    const destCompDir = path.join(componentsDir, normalizedSp);
    if (fs.existsSync(spCompDir)) {
      try {
        await fsp.cp(spCompDir, destCompDir, {
          recursive: true,
          force: true,
          errorOnExist: false,
        });
      } catch (e) {
        console.warn(`Warning copying components for ${sp}:`, e.message);
      }
    }

    // 3. Copy data
    const spDataDir = path.join(spSrcDir, "data");
    const destDataDir = path.join(dataDir, normalizedSp);
    if (fs.existsSync(spDataDir)) {
      try {
        await fsp.cp(spDataDir, destDataDir, {
          recursive: true,
          force: true,
          errorOnExist: false,
        });
      } catch (e) {
        console.warn(`Warning copying data for ${sp}:`, e.message);
      }
    }

    // 4. Copy contexts
    const spContextDir = path.join(spSrcDir, "context");
    const rootContextDir = path.join(srcDir, "context");
    if (fs.existsSync(spContextDir)) {
      try {
        await fsp.cp(spContextDir, rootContextDir, {
          recursive: true,
          force: true,
          errorOnExist: false,
        });
      } catch (e) {
        console.warn(`Warning copying context for ${sp}:`, e.message);
      }
    }

    console.log(`Migrated ${sp}`);
  }

  // Generate src/App.tsx dynamically
  let appCode = `import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";

// Auto-generated Routes
`;

  for (const page of importedPages) {
    appCode += `import ${page.name}Page from "./pages/${page.name}/index";\n`;
  }

  appCode += `\nexport default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/${importedPages[0]?.path || "home"}" />} />
`;

  for (const page of importedPages) {
    appCode += `          <Route path="/${page.path}" element={<${page.name}Page />} />\n`;
  }

  appCode += `        </Routes>
      </Layout>
    </Router>
  );
}
`;

  await fsp.writeFile(path.join(srcDir, "App.tsx"), appCode, "utf8");
  console.log("Updated src/App.tsx with new routes.");

  console.log("Migration complete!");
}

run().catch((err) => {
  console.error("ERROR OCCURRED:");
  console.error(err);
});
