import fs from "fs";
import generate from "@babel/generator";
import { traverse, parse } from "@babel/core";
import childProcess from "child_process";

import { _read_config } from "../config/config.js";

export const get_files_to_modify = () => {
  const filesToModify = childProcess
    .execSync("git diff --cached --name-only --diff-filter=ACM", {
      encoding: "utf8",
    })
    .split("\n")
    .filter((file) => file.endsWith(".js"));
  return filesToModify;
};

export const modify_files_and_add = (
  filesToModify,
  disposableFunctionName = "hidis",
  sourceType = "module"
) => {
  // Code modification logic to remove disposable() functions
  const { data } = _read_config();
  filesToModify.forEach((filePath) => {
    let code = fs.readFileSync(filePath, "utf8");
    let initial_code = code;

    const ast = parse(code, {
      sourceType, // Use 'module' for ESM
    });

    removeFunctionCalls(ast, disposableFunctionName);

    // Convert the modified AST back to code
    code = generate.default(ast).code;

    // Write the modified code into the file
    fs.writeFileSync(filePath, code, "utf8");
    // git add the file
    childProcess.execSync(`git add ${filePath}`);

    if (data.original === "true") {
      // Return the file to its original form

      fs.writeFileSync(filePath, initial_code, "utf8");
    }
  });
};

function removeFunctionCalls(ast, disposableFunctionName) {
  traverse(ast, {
    CallExpression(path) {
      if (
        path.node.callee.type === "Identifier" &&
        path.node.callee.name === disposableFunctionName
      ) {
        path.remove();
      }
    },
  });
}
