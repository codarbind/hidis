export const hidis = (code) => {
  const func = new Function(code);
  func();
};
