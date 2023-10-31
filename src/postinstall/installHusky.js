import { exec } from "child_process";
import path from "path";

//not working as expected - it is updating hidis packagejson but we want it inside user's pkgjson
export const installHusky = () => {
  // Specify the npm command you want to run

  const userDir = path.join(process.env.INIT_CWD, "/");

  const npmCommand = `npm install husky --save-dev --prefix ${userDir}`;

  // Run npm install as a child process
  const npmInstallProcess = exec(npmCommand);

  npmInstallProcess.stdout.on("data", (data) => {
    console.log(`husky install: ${data}`);
  });

  npmInstallProcess.stderr.on("data", (data) => {
    console.error(`husky install: ${data}`);
  });

  npmInstallProcess.on("close", (code) => {
    if (code === 0) {
      console.log("husky installed successfully");
    } else {
      console.error(`husky installation failed with exit code ${code}`);
    }
  });
};
