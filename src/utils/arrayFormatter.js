export const groupBy = (array, key) => {
  return array.reduce((group, element) => {
    let n = element[key].length;
    var newGroup = group;
    while (n > 0) {
      const keyValue = element[key][n - 1]["value"];
      n = n - 1;
      newGroup = {
        ...newGroup,
        [keyValue]: [...(newGroup[keyValue] ?? []), element],
      };
    }
    return newGroup;
  }, {});
};