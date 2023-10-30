import { createPrecommFile } from "./createFileWithContent.js";
import { createHidisFolder } from "./createPrecommitFolder.js";
import { updateUserPrecommScript } from "./updateUserPrecommitScript.js";

export const dopostintall = () => {
  createHidisFolder();
  createPrecommFile();
  updateUserPrecommScript();
  return true;
};

dopostintall();
