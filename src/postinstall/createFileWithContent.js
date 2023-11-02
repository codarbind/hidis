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
  const code_global = `import { ghost } from "hidis";\nglobalThis.hidis = ghost;\nexport const you = "be good, always";\n`;
  fs.writeFileSync(glohidisFilePath, code_global);

  // Create the index.js file with sample code
  const indexFilePath = path.join(hidisFolderPath, "index.js");
  const code_index = `export * from "./glohidis.js";\n`;
  fs.writeFileSync(indexFilePath, code_index);

  // Create the config.js file with sample code
  const configPath = path.join(hidisFolderPath, "config.js");
  const code_config = `import {modifyConfig} from "hidis";\nmodifyConfig();\nconsole.log('Done modifying 🦸‍♂️');\n`;
  fs.writeFileSync(configPath, code_config);

  // Create the config.json file with sample code
  const configJsonPath = path.join(hidisFolderPath, "config.json");
  const code_configJson = `{"original":"true"}\n`;
  fs.writeFileSync(configJsonPath, code_configJson);

  //upsert .gitignore file
  const gitignorePath = path.join(process.env.INIT_CWD, ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    const code_gitignore = `.hidis/\n`;
    fs.writeFileSync(gitignorePath, code_gitignore);
  } else {
    let gitignoreContent = fs.readFileSync(gitignorePath, "utf8");

    // Check if .hidis is already ignored
    if (gitignoreContent.includes(".hidis/")) {
    } else {
      // Append '.hidis/' to the .gitignore file
      fs.appendFileSync(gitignorePath, "\n.hidis/\n");
    }
  }

  // Create the precomm.c.js file with sample code
  const precommFilePathCjs = path.join(hidisFolderPath, "precomm.c.js");
  const codeCjs = `const { dohidis } = require("hidis");
dohidis();
console.log('Done hiding 👍');
`;
  fs.writeFileSync(precommFilePathCjs, codeCjs);

  // Create the glohidis.c.js file with sample code
  const glohidisFilePathCjs = path.join(hidisFolderPath, "glohidis.c.js");
  const code_globalCjs = `const { ghost } = require("hidis");
global.hidis = ghost;
exports.you = "be good, always";
`;
  fs.writeFileSync(glohidisFilePathCjs, code_globalCjs);

  // Create the index.c.js file with sample code
  const indexFilePathCjs = path.join(hidisFolderPath, "index.c.js");
  const code_indexCjs = `module.exports = require("./glohidis.c.js");
`;
  fs.writeFileSync(indexFilePathCjs, code_indexCjs);

  // Create the config.c.js file with sample code
  const configPathCjs = path.join(hidisFolderPath, "config.c.js");
  const code_configCjs = `const { modifyConfig } = require("hidis");
modifyConfig();
console.log('Done modifying 👍');
`;
  fs.writeFileSync(configPathCjs, code_configCjs);

  console.log("files created successfully.");
};
