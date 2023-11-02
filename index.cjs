"use strict";

var fs = require("fs");
var generate = require("@babel/generator");
var core = require("@babel/core");
var childProcess = require("child_process");
var url = require("url");
var path = require("path");

var _documentCurrentScript =
  typeof document !== "undefined" ? document.currentScript : null;
const ghost = (code) => {
  const func = new Function(code);
  func();
};

const _modify_config = (key, value) => {
  const { data, configFile } = _read_config();
  if (
    key === "original" &&
    value.toLowerCase() !== "true" &&
    value.toLowerCase() !== "false"
  ) {
    throw new Error("value has to be true or false");
  } else {
    // Modify the JSON data as needed
    data["original"] = value.toLowerCase();
  }

  // Write the modified JSON data back to the file
  fs.writeFileSync(configFile, JSON.stringify(data, null, 2), "utf8");

  console.log("Hidis configuration updated. 😉");
};

const _read_config = () => {
  // Get the current script's directory
  const __dirname = path.dirname(__filename);

  const configFile = path.join(__dirname, "./src/config/config.json");

  // Read the JSON file
  const data = JSON.parse(fs.readFileSync(configFile, "utf8"));
  return { data, configFile };
};

const get_files_to_modify = () => {
  const filesToModify = childProcess
    .execSync("git diff --cached --name-only --diff-filter=ACM", {
      encoding: "utf8",
    })
    .split("\n")
    .filter((file) => file.endsWith(".js"));
  return filesToModify;
};

const modify_files_and_add = (
  filesToModify,
  disposableFunctionName = "hidis",
  sourceType = "module"
) => {
  // Code modification logic to remove disposable() functions
  const { data } = _read_config();
  filesToModify.forEach((filePath) => {
    let code = fs.readFileSync(filePath, "utf8");
    let initial_code = code;

    const ast = core.parse(code, {
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
  core.traverse(ast, {
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

const dohidis = (disposableFunctionName = "hidis") => {
  const filesToModify = get_files_to_modify();

  modify_files_and_add(filesToModify, disposableFunctionName);
};

const config_intention = () => {
  // Get the command-line arguments, excluding the first two (Node.js executable and script filename)
  const args = process.argv.slice(2);

  if (args.length < 1) throw new Error("provide arguments");
  // Loop through the arguments to parse args and their values
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "original") {
      // If the 'original' arg is found, set the 'originalarg' to 'true'

      i++;
      const value = args[i];

      return { arg, value };
    } else {
      // Handle any other arguments or args as needed
      throw new Error(`Unknown argument or arg: ${arg}`);
    }
  }
};

const modifyConfig = () => {
  let { arg, value } = config_intention();
  _modify_config(arg, value);
};

exports.dohidis = dohidis;
exports.ghost = ghost;
exports.modifyConfig = modifyConfig;
