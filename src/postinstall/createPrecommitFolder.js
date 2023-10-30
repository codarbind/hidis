import fs from "fs";
import path from "path";

export const createHidisFolder = () => {
  // Determine the path to the .hidis folder in the current working directory
  const hidisFolderPath = path.join(process.env.INIT_CWD, ".hidis");

  // Create the .hidis folder
  fs.mkdir(hidisFolderPath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Failed to create the .hidis folder: ${err.message}`);
    } else {
      console.log("The .hidis folder has been created.");
    }
  });
};
