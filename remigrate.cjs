const fs = require("fs");
const path = require("path");
const fsp = require("fs/promises");

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");
const pagesDir = path.join(srcDir, "pages");
const componentsDir = path.join(srcDir, "components");
const dataDir = path.join(srcDir, "data");

const subprojects = [
  "about-us",
  "business",
  "business-management",
  "business-management-services",
  "outsourcing",
  "partner-agreement",
  "partner-commission-share-hub",
  "partner-commission-share-schedule",
  "partner-program",
  "partner-registty",
  "payroll",
  "privacy-policy",
  "refund",
  "secure-access",
  "terms and conditon",
  "training academy",
];

function toPascalCase(str) {
  return str
    .split(/[- ]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function normalizeName(str) {
  return str.replace(/ /g, "-");
}

async function run() {
  // 1. Cleanup old migration
  if (fs.existsSync(pagesDir)) {
    await fsp.rm(pagesDir, { recursive: true, force: true });
  }
  for (let sp of subprojects) {
    const normalizedSp = normalizeName(sp);
    const compSp = path.join(componentsDir, normalizedSp);
    if (fs.existsSync(compSp))
      await fsp.rm(compSp, { recursive: true, force: true });

    const dataSp = path.join(dataDir, normalizedSp);
    if (fs.existsSync(dataSp))
      await fsp.rm(dataSp, { recursive: true, force: true });
  }

  await fsp.mkdir(pagesDir, { recursive: true });

  let imports = `import React from 'react';\nimport { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';\n\n`;
  let routes = ``;

  for (let sp of subprojects) {
    const spDir = path.join(rootDir, sp);
    const spSrcDir = path.join(spDir, "src");
    const normalizedSp = normalizeName(sp);

    if (!fs.existsSync(spSrcDir)) {
      continue;
    }

    const pageName = toPascalCase(sp);
    const pageDirDest = path.join(pagesDir, pageName);

    // 2. Copy the entire 'src' of the subproject to the new page directory!
    await fsp.cp(spSrcDir, pageDirDest, { recursive: true });

    // Since App.tsx still has 'export default function App', it's fine. We just import it.
    imports += `import ${pageName}Page from './pages/${pageName}/App';\n`;
    routes += `        <Route path="/${normalizedSp}" element={<${pageName}Page />} />\n`;

    console.log(`Sandboxed ${sp} to src/pages/${pageName}`);
  }

  const appTsxContent = `${imports}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/about-us" />} />
${routes}
      </Routes>
    </Router>
  );
}
`;

  await fsp.writeFile(path.join(srcDir, "App.tsx"), appTsxContent, "utf8");
  console.log("Migration via Sandboxing complete!");
}

run().catch(console.error);
