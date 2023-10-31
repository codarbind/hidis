import fs from "fs";
import path from "path";

export const updateUserPrecommScript = () => {
  // update .husky/pre-commit file

  try {
    // 1. Get the husky pre commit file in the working directory
    const pcPath = path.resolve(process.env.INIT_CWD, ".husky/pre-commit");

    // 2. Read the file
    if (!fs.existsSync(pcPath)) {
      throw new Error(
        "You need to install husky\nrun npm i husky --save-dev\n"
      );
      const code_pc = `node .hidis/precomm.js\n`;
      fs.writeFileSync(pcPath, code_pc);
    } else {
      let pcContent = fs.readFileSync(pcPath, "utf8");

      // Check if command is already issued
      if (pcContent.includes("node .hidis/precomm.js")) {
      } else {
        // Append command to the file
        fs.appendFileSync(pcPath, "\nnode .hidis/precomm.js\n");
      }
    }

    console.log("precommit script updated for hidis successfully.");
  } catch (error) {
    throw new Error(error);
  }
};
