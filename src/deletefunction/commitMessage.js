import fs from "fs";

export const get_commit_message = () => {
  // Access the command line arguments
  const command = process.argv.slice(2).join(" "); // Combine all arguments into a single string

  if (command) {
    const parts = command.split(/(?<=-m )/); // Split the command at '-m ' preserving '-m ' in the parts

    if (parts.length >= 2) {
      // The first part is 'git commit' and the second part is the commit message
      const gitCommitCommand = parts[0];
      const commitMessage = parts[1];

      return commitMessage;
    } else {
      throw new Error(
        "Invalid command. Expected format: \"git commit -m 'commit message'\""
      );
    }
  } else {
    throw new Error("No command provided.");
  }
};
