import fs from "fs";
import * as acorn from "acorn";
import * as walk from "acorn-walk";
import childProcess from "child_process";
import { removeNodes } from "./removeNodes.js";

export const get_files_to_modify = () => {
  const filesToModify = childProcess
    .execSync("git diff --cached --name-only --diff-filter=ACM", {
      encoding: "utf8",
    })
    .split("\n")
    .filter((file) => file.endsWith(".js"));
  return filesToModify;
};

export const modify_files_and_commit = (
  filesToModify,
  commitMessage,
  disposableFunctionName = "hidis"
) => {
  filesToModify.forEach((filePath) => {
    let code = fs.readFileSync(filePath, "utf8");
    const ast = acorn.parse(code, { sourceType: "module" });

    // Code modification logic to remove disposable() functions

    filesToModify.forEach((filePath) => {
      let code = fs.readFileSync(filePath, "utf8");
      const ast = acorn.parse(code, { sourceType: "module" });

      // Walk the AST to find and remove disposable() calls
      walk.simple(ast, {
        CallExpression(node) {
          if (node.callee.name === disposableFunctionName) {
            // Remove the disposable() call and its arguments
            removeNodes(node, ast.body);
          }
        },
      });

      // Convert the modified AST back to code
      code = acorn.generate(ast, {
        sourceMap: null,
      });

      // Write the modified code back to the file
      fs.writeFileSync(filePath, code, "utf8");
    });
  });
  childProcess.execSync("git add .");

  childProcess.execSync(`git commit -F - <<< "${commitMessage}"`);

  return true;
};
