import fs from "fs";
import * as acorn from "acorn";
import * as walk from "acorn-walk";
import childProcess from "child_process";
import { removeNodes } from "./removeNodes.js";
import { generate } from "escodegen";

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
  disposableFunctionName = "hidis"
) => {
  // Code modification logic to remove disposable() functions

  filesToModify.forEach((filePath) => {
    let code = fs.readFileSync(filePath, "utf8");
    const ast = acorn.parse(code, {
      sourceType: "module",
      ecmaVersion: 8,
    });

    let initial_body = ast.body;
    let filtered_body = initial_body.filter((r_n) => {
      return r_n.expression?.callee?.name !== disposableFunctionName;
    });

    ast.body = filtered_body;
    // Convert the modified AST back to code
    code = generate(ast);

    // Write the modified code back to the file
    fs.writeFileSync(filePath, code, "utf8");
  });

  childProcess.execSync(`git add ${filesToModify.join(" ")}`);
};
