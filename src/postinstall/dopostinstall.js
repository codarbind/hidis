import { createPrecommFile } from "./createFileWithContent.js";
import { createHidisFolder } from "./createPrecommitFolder.js";
import { updateUserScript } from "./updateUserScript.js";
export const dopostintall = () => {
  createHidisFolder();
  createPrecommFile();
  updateUserScript();

  return true;
};

dopostintall();
