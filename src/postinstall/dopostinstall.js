import { createPrecommFile } from "./createFileWithContent.js";
import { createHidisFolder } from "./createPrecommitFolder.js";

export const dopostintall = () => {
  createHidisFolder();
  createPrecommFile();

  return true;
};

dopostintall();
