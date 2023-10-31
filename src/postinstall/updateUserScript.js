import fs from "fs";
import path from "path";

export const updateUserScript = () => {
  // 1. Get the package.json file in the working directory
  const packageJsonPath = path.resolve(process.env.INIT_CWD, "package.json");

  // 2. Read the package.json file
  try {
    const data = fs.readFileSync(packageJsonPath, { encoding: "utf8" }); //require(packageJsonPath);
    const packageJson = JSON.parse(data);
    // 3. Check if there is a precommit script defined
    if (!packageJson.scripts || !packageJson.scripts.hidisConfig) {
      // If no precommit script is defined, define one
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts.hidisConfig = "node .hidis/config.js";
    } else if (
      !packageJson.scripts.hidisConfig.includes("node .hidis/config.js")
    ) {
      // 4. If a precommit script is defined but no one hidis, add to the current one
      packageJson.scripts.hidisConfig = `node .hidis/config.js && ${packageJson.scripts.hidisConfig}`;
    }

    // Write the updated package.json back to the file
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log("config script updated for hidis successfully.");
  } catch (error) {
    throw new Error(error);
  }
};
