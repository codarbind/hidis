// Function to recursively remove nodes from an array

export const removeNodes = (arr, node, parent) => {
  const index = arr.indexOf(node);
  if (index > -1) {
    arr.splice(index, 1);
  } else {
    for (const key in node) {
      if (node[key] && typeof node[key] === "object") {
        removeNodes(node[key], node, key);
      }
    }
  }
};
