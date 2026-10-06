const fs = require("fs");
const path = require("path");
const fsp = require("fs/promises");

const rootDir = process.cwd();

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

async function run() {
  let allDeps = new Set();

  for (let sp of subprojects) {
    const spDir = path.join(rootDir, sp);
    if (!fs.existsSync(spDir)) continue;

    const pkgPath = path.join(spDir, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(await fsp.readFile(pkgPath, "utf8"));
      if (pkg.dependencies) {
        for (let key of Object.keys(pkg.dependencies)) {
          // Exclude basic react/vite stuff assuming root has it, but it's safe to just list all.
          if (key !== "react" && key !== "react-dom" && key !== "vite") {
            allDeps.add(key);
          }
        }
      }
    }

    // Now delete the original folder!
    await fsp.rm(spDir, { recursive: true, force: true });
    console.log(`Deleted folder ${sp}`);
  }

  console.log("DEPENDENCIES_TO_INSTALL:");
  console.log(Array.from(allDeps).join(" "));
}

run().catch(console.error);
