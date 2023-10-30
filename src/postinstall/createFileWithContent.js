import fs from "fs";
import path from "path";

export const createPrecommFile = () => {
  const hidisFolderPath = path.join(process.env.INIT_CWD, ".hidis");

  // Ensure the .hidis directory exists
  if (!fs.existsSync(hidisFolderPath)) {
    fs.mkdirSync(hidisFolderPath, { recursive: true });
  }

  // Create the precomm.js file with sample code
  const precommFilePath = path.join(hidisFolderPath, "precomm.js");
  const code = `import {dohidis} from "hidis";\ndohidis();\nconsole.log('Done hiding 👍');\n`;
  fs.writeFileSync(precommFilePath, code);

  // Create the glohidis.js file with sample code
  const glohidisFilePath = path.join(hidisFolderPath, "glohidis.js");
  const code_global = `import { hidis } from "hidis";\nglobalThis.ghost = hidis;\nexport const you = "be good, always";\n`;
  fs.writeFileSync(glohidisFilePath, code_global);

  // Create the index.js file with sample code
  const indexFilePath = path.join(hidisFolderPath, "index.js");
  const code_index = `export * from "./glohidis.js";\n`;
  fs.writeFileSync(indexFilePath, code_index);

  console.log("files created successfully.");
};
