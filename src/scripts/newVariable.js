// A variable is defined in the variables tab and can be referenced from prompts
export const newVariable = (key = "") => ({
  key,
  value: "",
});
