import {
  get_files_to_modify,
  modify_files_and_commit,
} from "./filesToModify.js";
import { get_commit_message } from "./commitMessage.js";

export const dohidis = () => {
  const commitMessage = get_commit_message();

  const filesToModify = get_files_to_modify();

  modify_files_and_commit(filesToModify, commitMessage, disposableFunctionName);
};
