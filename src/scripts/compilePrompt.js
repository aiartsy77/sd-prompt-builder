import { pipe, filter, map, join, includes, tail, head, split, replace } from "ramda";

// state: () => ({
//   useRegionalPromter: false,
//   phrases: [],
//   auxSections: [],
//   negPhrases: [],
//   aDetailerPhrases: [],
//   aDetailerNegPhrases: [],
// }),

export const replaceVariable = (variables) => (phrase) => {
  // , . ; : [ ] ( ) { }
  const splits = split(/,|\.|;|:|\[|\]|\(|\)|\{|\}|\|| /g)(phrase);
  const variableName = head(splits);
  const correspondingVariable = variables.find((v) => v.key === variableName);
  const varValue = correspondingVariable?.value;
  if (!varValue) return phrase;
  return replace(variableName, varValue)(phrase);
};

const insertVariables = (variables, textValue) => {
  const splits = split("^")(textValue);
  const textStart = head(splits);
  const parts = tail(splits);
  const morphedParts = map(replaceVariable(variables))(parts);
  return join("")([textStart, ...morphedParts]);
};

const phraseToString = (variables) => (phrase) => {
  if (phrase.phraseType === "V") {
    const correspondingVariable = variables.find((v) => v.key === phrase.variableName);
    return correspondingVariable?.value;
  }
  if (!includes("^", phrase.textValue)) return phrase.textValue;
  return insertVariables(variables, phrase.textValue);
};

export const phrasesToPromptSection = (variables) =>
  pipe(
    filter((x) => x.active),
    map(phraseToString(variables)),
    join(", ")
  );

export const compilePrompt = (variables) => (state) => {
  if (!state?.phrases) return "";
  const mainPhrases = phrasesToPromptSection(variables)(state.phrases);
  if (!state.auxSections || state.auxSections.length == 0) return mainPhrases;
  const sPhrases = state.auxSections.map((s) => phrasesToPromptSection(variables)(s.phrases));
  if (state.useRegionalPromter) return `${mainPhrases}\nADDBASE\n${join("\nADDROW\n", sPhrases)}`;
  return join("\nBREAK\n", [mainPhrases, ...sPhrases]);
};
