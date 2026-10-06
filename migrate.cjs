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
  await fsp.mkdir(pagesDir, { recursive: true });
  await fsp.mkdir(componentsDir, { recursive: true });
  await fsp.mkdir(dataDir, { recursive: true });

  for (let sp of subprojects) {
    const normalizedSp = normalizeName(sp);
    const spDir = path.join(rootDir, sp);
    const spSrcDir = path.join(spDir, "src");

    if (!fs.existsSync(spSrcDir)) {
      console.log(`Skipping ${sp} - no src dir`);
      continue;
    }

    const pageName = toPascalCase(sp);
    const pageDirDest = path.join(pagesDir, pageName);
    await fsp.mkdir(pageDirDest, { recursive: true });

    // 1. Copy App.tsx
    const appTsxPath = path.join(spSrcDir, "App.tsx");
    const indexTsxPath = path.join(pageDirDest, "index.tsx");
    if (fs.existsSync(appTsxPath)) {
      let content = await fsp.readFile(appTsxPath, "utf8");
      content = content.replace(
        /from\s+['"]\.\/components\//g,
        `from '../../components/${normalizedSp}/`,
      );
      content = content.replace(
        /import\s+['"]\.\/components\//g,
        `import '../../components/${normalizedSp}/`,
      );
      content = content.replace(
        /from\s+['"]\.\/data\//g,
        `from '../../data/${normalizedSp}/`,
      );
      content = content.replace(
        /from\s+['"]\.\/context\//g,
        `from '../../context/`,
      );

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
    }

    // 2. Copy components
    const spCompDir = path.join(spSrcDir, "components");
    const destCompDir = path.join(componentsDir, normalizedSp);
    if (fs.existsSync(spCompDir)) {
      await fsp.cp(spCompDir, destCompDir, { recursive: true });
    }

    // 3. Copy data
    const spDataDir = path.join(spSrcDir, "data");
    const destDataDir = path.join(dataDir, normalizedSp);
    if (fs.existsSync(spDataDir)) {
      await fsp.cp(spDataDir, destDataDir, { recursive: true });
    }

    // 4. Copy contexts
    const spContextDir = path.join(spSrcDir, "context");
    const rootContextDir = path.join(srcDir, "context");
    if (fs.existsSync(spContextDir)) {
      await fsp.cp(spContextDir, rootContextDir, { recursive: true });
    }

    console.log(`Migrated ${sp}`);
  }

  console.log("Migration complete!");
}

run().catch((err) => {
  console.error("ERROR OCCURRED:");
  console.error(err);
});
