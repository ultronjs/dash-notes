export const getFilteredData = (state,notes) => {
  console.log(sortBy(state,filterBy(state,notes)));
  return sortBy(state, notes);

}

export const sortBy = (state, notes) => {
  switch (state.sortBy.value) {
    case "Newest First":
      return [
        ...notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      ];
    case "Newest Last":
      return [
        ...notes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
      ];
    case "Priority High to Low":
      {const lowPriorityTask = [...notes.filter(element=>element.priority.label==="Low")]
      const mediumPriorityTask = [
        ...notes.filter((element) => element.priority.label === "Medium"),
      ];
      const highPriorityTask = [
        ...notes.filter((element) => element.priority.label === "High"),
      ];
      return [].concat(highPriorityTask).concat(mediumPriorityTask).concat(lowPriorityTask)
    }
    case "Priority Low to High":
      const lowPriorityTask = [
        ...notes.filter((element) => element.priority.label === "Low"),
      ];
      const mediumPriorityTask = [
        ...notes.filter((element) => element.priority.label === "Medium"),
      ];
      const highPriorityTask = [
        ...notes.filter((element) => element.priority.label === "High"),
      ];
      return []
        .concat(lowPriorityTask)
        .concat(mediumPriorityTask)
        .concat(highPriorityTask);
    default:
      return [...notes];
  }
};

export const filterBy = (state,notes) => {
  switch(state.filterBy.value){
    case "Labels/Tags":
      console.log([
        ...notes.filter((note) =>
          note.tags.forEach((tag) =>state.state.filterByValue)
        ),
      ]);
      return [...notes]
    case "Priority":
      return [
        ...notes.filter((note) =>
          state.filterByValue.some(element => element === note.priority.label)
        ),
      ];
    default:
     return [...notes]
  }

}

export const searchFilter = (items, search) => {
  return items.filter(
    (item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
  );
};
