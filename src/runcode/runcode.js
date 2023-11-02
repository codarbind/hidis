export const ghost = (code) => {
  const func = new Function(code);
  func();
};
