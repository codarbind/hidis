import fs from "fs";

export const get_commit_message = () => {
  // Get the original commit message
  const commitMessage = fs
    .readFileSync(process.env.HUSKY_GIT_PARAMS, "utf8")
    .trim();
  console.log({ pev: process.env.HUSKY_GIT_PARAMS });

  return commitMessage;
};
