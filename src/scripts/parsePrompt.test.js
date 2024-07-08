import { describe, test, expect } from "vitest";
import { parsePrompt, splitPhrases } from "./parsePrompt.js";
import { map } from "ramda";
import { newPhrase } from "./newPhrase.js";

const phrasesFor = map(newPhrase);

describe("parsePrompt", () => {
  test("should return empty state for empty string", () => {
    expect(parsePrompt("")).toEqual({
      useRegionalPromter: false,
      phrases: [newPhrase()],
      auxSections: [],
    });
  });

  test("should return phrases", () => {
    expect(parsePrompt("aap, noot, mies")).toEqual({
      useRegionalPromter: false,
      phrases: phrasesFor(["aap", "noot", "mies"]),
      auxSections: [],
    });
  });

  test("should work with commas without spaces or extra spaces", () => {
    expect(parsePrompt("aap,noot  ,  mies")).toEqual({
      useRegionalPromter: false,
      phrases: phrasesFor(["aap", "noot", "mies"]),
      auxSections: [],
    });
  });

  test("should work with sections", () => {
    expect(parsePrompt("aap, noot, mies\nBREAK\none, two, three\nBREAK\ncarl, jimmy")).toEqual({
      useRegionalPromter: false,
      phrases: phrasesFor(["aap", "noot", "mies"]),
      auxSections: [
        {
          phrases: phrasesFor(["one", "two", "three"]),
        },
        {
          phrases: phrasesFor(["carl", "jimmy"]),
        },
      ],
    });
  });

  test("should work with regional prompt", () => {
    expect(parsePrompt("aap, noot, mies\nADDBASE\none, two, three\nADDROW\ncarl, jimmy")).toEqual({
      useRegionalPromter: false,
      phrases: phrasesFor(["aap", "noot", "mies"]),
      auxSections: [
        {
          phrases: phrasesFor(["one", "two", "three"]),
        },
        {
          phrases: phrasesFor(["carl", "jimmy"]),
        },
      ],
    });
  });
});

describe("splitPhrases", () => {
  test("should work", () => {
    expect(splitPhrases("aap, noot, mies")).toEqual(["aap", "noot", "mies"]);
  });

  test("should not split phrases in square brackets", () => {
    expect(splitPhrases("aap, [noot, mies:1.3]")).toEqual(["aap", "[noot, mies:1.3]"]);
  });

  test("should not split phrases in brackets", () => {
    expect(splitPhrases("aap, (noot, mies:1.3)")).toEqual(["aap", "(noot, mies:1.3)"]);
  });

  test("should not split phrases in curly brackets", () => {
    expect(splitPhrases("{aap, noot|shark, tank}, (big, strong:1.3)")).toEqual([
      "{aap, noot|shark, tank}",
      "(big, strong:1.3)",
    ]);
  });

  // todo: this would be nice:
  // test("should not split example", () => {
  //   const phrase =
  //     "(grey skirt, {short skirt, |miniskirt, |}{buttoned shirt, {white shirt, |}|white top}:1.3)";
  //   expect(splitPhrases(phrase)).toEqual(phrase);
  // });
});
