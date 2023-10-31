import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

export const _modify_config = (key, value) => {
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

export const _read_config = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const configFile = path.join(__dirname, "/config.json");

  // Read the JSON file
  const data = JSON.parse(fs.readFileSync(configFile, "utf8"));
  return { data, configFile };
};
