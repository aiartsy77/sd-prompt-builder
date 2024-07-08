export const newPhrase = (textValue = "") => ({
  active: true,
  phraseType: "T", // T for text, V for variable
  textValue,
  variableName: "", // only used if phraseType equals "V", it references a variable key
});
