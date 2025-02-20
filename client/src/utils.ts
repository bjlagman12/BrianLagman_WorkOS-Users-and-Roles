export const getRoleNameById = (roleId: string) => {
  switch (roleId) {
    case "1a235261-fa93-4845-ab48-ee23895998e6":
      return "Engineering";
    case "5237711f-7969-4923-aacc-a623a4e9dac1":
      return "Design";
    case "36c8de01-e30a-4682-b8cf-962593a8d3b6":
      return "Developer Experience";
    case "6c0a71c0-a5bc-44f8-8634-60f44840d92a":
      return "Support";
    default:
      return null;
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
