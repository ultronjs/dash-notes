export const sortByOptions = [
  { value: "Newest First", label: "Newest First" },
  { value: "Newest Last", label: "Newest Last" },
  { value: "Priority High to Low", label: "Priority High to Low" },
  { value: "Priority Low to High", label: "Priority Low to High" },
];
export const filterOptions = [
  {
    value: "Labels/Tags",
    label: "Labels/Tags",
    option: [
      "Home",
      "Work",
      "Hobby",
      "Study",
      "Passion",
      "Preparation",
      "Others",
    ],
  },
  {
    value: "Priority",
    label: "Priority",
    option: ["High", "Medium", "Low"],
  },
];

export const tagOptions = [
    { value: "Home", label: "Home" },
    { value: "Work", label: "Work" },
    { value: "Hobby", label: "Hobby" },
    { value: "Study", label: "Study" },
    { value: "Passion", label: "Passion" },
    { value: "Preparation", label: "Preparation" },
    { value: "Others", label: "Others" },
  ];
  export const priorityOptions = [
    { value: "Low", label: "Low", className: "badge_success" },
    { value: "Medium", label: "Medium", className: "badge_warning" },
    { value: "High", label: "High", className: "badge_danger" },
  ];