import fs from "fs";
import path from "path";

export const updateUserScript = (
  { packageJson, packageJsonPath } = readUserPackageJson()
) => {
  let command_cjs = "node .hidis/config.c.js";
  let command_es6 = "node .hidis/config.js";
  let command =
    determineTypeOfUserProject().type === "es6" ? command_es6 : command_cjs;
  try {
    // 3. Check if there is a precommit script defined
    if (!packageJson.scripts || !packageJson.scripts.hidisConfig) {
      // If no precommit script is defined, define one
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts.hidisConfig = command;
    } else if (!packageJson.scripts.hidisConfig.includes(command)) {
      // 4. If a precommit script is defined but no one hidis, add to the current one
      packageJson.scripts.hidisConfig = `${command} && ${packageJson.scripts.hidisConfig}`;
    }

    // Write the updated package.json back to the file
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log("config script updated for hidis successfully.");
  } catch (error) {
    throw new Error(error);
  }
};

export const readUserPackageJson = () => {
  // 1. Get the package.json file in the working directory
  const packageJsonPath = path.resolve(process.env.INIT_CWD, "package.json");

  // 2. Read the package.json file

  const data = fs.readFileSync(packageJsonPath, { encoding: "utf8" }); //require(packageJsonPath);
  const packageJson = JSON.parse(data);

  return { packageJson, packageJsonPath };
};

export const determineTypeOfUserProject = (
  { packageJson } = readUserPackageJson()
) => {
  let mainPath, mainContent;
  const { main } = packageJson;
  if (main) {
    mainPath = path.resolve(process.env.INIT_CWD, main);
    mainContent = fs.readFileSync(mainPath, "utf8");
  }
  // Check the "type" field in package.json
  if (
    packageJson.type === "module" ||
    mainContent.includes("import") ||
    mainContent.includes("export")
  ) {
    return { type: "es6", mainPath };
  } else if (packageJson.type === "commonjs") {
    return { type: "cjs", mainPath };
  } else {
    return { type: "unknown", mainPath };
  }
};
