export const config_intention = () => {
  // Get the command-line arguments, excluding the first two (Node.js executable and script filename)
  const args = process.argv.slice(2);

  if (args.length < 1) throw new Error("provide arguments");
  // Loop through the arguments to parse args and their values
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "original") {
      // If the 'original' arg is found, set the 'originalarg' to 'true'

      i++;
      const value = args[i];

      return { arg, value };
    } else {
      // Handle any other arguments or args as needed
      throw new Error(`Unknown argument or arg: ${arg}`);
    }
  }
};
