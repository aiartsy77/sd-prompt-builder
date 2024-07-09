export const newPhrase = (textValue = "") => ({
  active: true,
  phraseType: "T", // T for text, V for variable, E for embedding
  textValue,
  variableName: "", // only used if phraseType equals "V", it references a variable key
  embedding: "", // only used if phraseType equals "E", it is an embedding
});
