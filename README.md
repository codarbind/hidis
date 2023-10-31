# Why Hidis?

Hidis is a tool designed for developers who need to keep certain functions and code snippets on their local machines during development without committing or pushing them to remote branches (e.g., production).

## Pre-Hidis Installation:

Hidis relies on pre commit hooks to achieve its goal.

1. **Install Husky:** Confirm that you have the `husky` package installed. If not, you can install it using the following npm command:

    ```shell
    npm i husky --save-dev
    ```

2. **Setup Husky for Hidis:** After installing Husky, run the following commands in your terminal:

    ```shell
    npm pkg set scripts.prepare="husky install"
    npm run prepare
    npx husky add .husky/pre-commit "node .hidis/precomm.js"
    git add .husky/pre-commit
    ```

## Hidis Installation:

To install Hidis, run the following command:

```shell
npm install hidis --save-dev
```

## How does it work?

To use Hidis, call the `hidis` function anywhere in your project. Hidis takes a string as an argument, so place your code inside single quotes. Make sure to separate more than one line of code with semicolons. Here's a sample:

```js
hidis('console.log("Everything inside this hidis would not be committed"); let name = "suliyat"; console.log(`My name is not ${name}`)');
```
When you run `git commit -m {your commit message}` Hidis would hide `hidis` functions and their arguments from being committed, thus from being pushed.
