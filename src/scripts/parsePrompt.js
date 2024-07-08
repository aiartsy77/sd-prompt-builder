import { map, split, pipe, trim, juxt, head, tail } from "ramda";
import { newPhrase } from "./newPhrase.js";

// state: () => ({
//   useRegionalPromter: false,
//   phrases: [],
//   auxSections: [],
//   negPhrases: [],
//   aDetailerPhrases: [],
//   aDetailerNegPhrases: [],
// }),

// regex based on answer found here: https://stackoverflow.com/questions/732029/how-to-split-string-by-unless-is-within-brackets-using-regex
const nonCapturedCommas = /,(?=[^(\)|\]|\})]*(?:\[|\(|\{|$))/;

export const splitPhrases = pipe(split(nonCapturedCommas), map(trim));

export const parsePhrases = pipe(splitPhrases, map(newPhrase));

const getSections = pipe(
  split(/\nBREAK\n|\nADDBASE\n|\nADDROW\n/),
  map(parsePhrases),
  juxt([head, tail])
);

export const parsePrompt = (prompt) => {
  const [main, other] = getSections(prompt);
  return {
    useRegionalPromter: false,
    phrases: main,
    auxSections: other.map((x) => ({ phrases: x })),
  };
};
