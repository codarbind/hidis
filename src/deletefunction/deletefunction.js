import { get_files_to_modify, modify_files_and_add } from "./filesToModify.js";

export const dohidis = (disposableFunctionName = "hidis") => {
  const filesToModify = get_files_to_modify();

  modify_files_and_add(filesToModify, disposableFunctionName);
};
