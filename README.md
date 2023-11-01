# Why Hidis?

Hidis is a tool designed for developers who need to keep certain functions and code snippets on their local machines during development without committing or pushing them to remote branches (e.g., production).

## Pre-Hidis Installation:

Hidis relies on pre commit hooks to achieve its goal.

1.  **Install Husky:** Confirm that you have the `husky` package installed. If not, you can install it using the following npm command:

```shell





npm  i  husky  --save-dev





```

2.  **Setup Husky for Hidis:** After installing Husky, run the following commands in your terminal:

```shell





npm  pkg  set  scripts.prepare="husky install"





npm  run  prepare





npx  husky  add  .husky/pre-commit  "node .hidis/precomm.js"





git  add  .husky/pre-commit





```

## Hidis Installation:

To install Hidis, run the following command:

```shell





npm  install  hidis  --save-dev





```

### Hidis Setup

Hidis creates a folder named (.hidis) inside your root directory.

You need to import this folder only once but in your main /entry point file and **in the first line.** If not imported at first line then you will get Reference error, it is like you want to use hidis before its birth. 😆

```error

ReferenceError: hidis is not defined

```

Import `hidis` like the below inside a file that you are sure would be loaded/required when the node server starts. It is called `main entry point file`. Your main file could be app.js or index.js. To confirm which file, check your `package.json` look for the value of main, that value/path leads to the file you are looking for.

Also ensure that the path you provides (import from) currently points to the `.hidis/index.js`

**For projects on ES6 **:

```js
import {} from "./.hidis/index.js";
```

**For projects on Cjs **:

```js
let {} = require("./.hidis/index.c.js");
```

## How does it work?

To use Hidis, call the `hidis` function anywhere in your project. Hidis takes a string as an argument. Make sure to separate more than one line of code with semicolons. Here's a sample:

```js
hidis(
  'console.log("Everything inside this hidis would not be committed"); let name = "suliyat"; console.log(`My name is not ${name}`)'
);
```

When you run `git commit -m {your commit message}` Hidis would hide `hidis` functions and their arguments from being committed, thus from being pushed.

## Ghost Mode - Original Content

Sometimes you still need the `hidis` functions on your local machine after committing/pushing, so permanently deleting `hidis` functions at every commit might not present a good dev experience (DX).

To ensure good DX you have the option to choose if you want the `hidis` functions permanently removed or not. Run the following command to change the config. the `default` is true (i.e. returns `hidis` functions back into their places)

```shell



npm  run  hidisConfig  --  original [false |  true]



```

Tweet at me https://x.com/wahabind
