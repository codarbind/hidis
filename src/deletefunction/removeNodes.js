// Function to recursively remove nodes from an array

// Function to recursively remove nodes from an array or object
export const removeNodes = (container, node, parentKey) => {
  if (Array.isArray(container)) {
    // If container is an array, remove the node from the array
    const index = container.indexOf(node);
    if (index > -1) {
      container.splice(index, 1);
      return container;
    }
  } else if (typeof container === "object") {
    // If container is an object, recursively search and remove the node
    for (const key in container) {
      if (key === "body") {
        let body = container[key];
      }
      if (container[key] === node) {
        delete container[key];
        return container;
      } else if (typeof container[key] === "object") {
        removeNodes(container[key], node, key);
      }
    }
  }
};
