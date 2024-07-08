import { pipe, filter, map, join } from "ramda";

// state: () => ({
//   useRegionalPromter: false,
//   phrases: [],
//   auxSections: [],
//   negPhrases: [],
//   aDetailerPhrases: [],
//   aDetailerNegPhrases: [],
// }),

const phraseToString = (variables) => (phrase) => {
  if (phrase.phraseType === "V") {
    const correspondingVariable = variables.find((v) => v.key === phrase.variableName);
    return correspondingVariable?.value;
  }
  return phrase.textValue;
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
