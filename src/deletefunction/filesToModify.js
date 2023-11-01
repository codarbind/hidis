import fs from "fs";
import * as acorn from "acorn";
import childProcess from "child_process";
import { generate } from "escodegen";
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
  disposableFunctionName = "hidis"
) => {
  // Code modification logic to remove disposable() functions
  const { data } = _read_config();
  filesToModify.forEach((filePath) => {
    let code = fs.readFileSync(filePath, "utf8");
    let initial_code = code;
    const ast = acorn.parse(code, {
      sourceType: "module",
      ecmaVersion: 2020,
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
    // git add the file
    childProcess.execSync(`git add ${filePath}`);
    if (data.original === "true") {
      // Return the file to its original form

      fs.writeFileSync(filePath, initial_code, "utf8");
    }
  });
};
