import { describe, test, expect } from "vitest";
import { compilePrompt } from "./compilePrompt.js";
import { newPhrase } from "./newPhrase.js";
import { map } from "ramda";

const phrasesFor = map(newPhrase);

describe("compilePrompt", () => {
  const compilePromptWithoutVariables = compilePrompt([]);

  test("should return empty string for empty state", () => {
    const emptyState = {};
    expect(compilePromptWithoutVariables(emptyState)).toBe("");
  });

  test("should put phrases in comma separated string", () => {
    const emptyState = { phrases: phrasesFor(["one", "two", "three"]) };
    expect(compilePromptWithoutVariables(emptyState)).toBe("one, two, three");
  });

  test("should work with sections", () => {
    const state = {
      phrases: phrasesFor(["one", "two", "three"]),
      auxSections: [
        { phrases: phrasesFor(["jim", "bill"]) },
        { phrases: phrasesFor(["mandy", "karen"]) },
      ],
    };
    expect(compilePromptWithoutVariables(state)).toBe(
      "one, two, three\nBREAK\njim, bill\nBREAK\nmandy, karen"
    );
  });

  test("should work with regional prompt", () => {
    const state = {
      useRegionalPromter: true,
      phrases: phrasesFor(["one", "two", "three"]),
      auxSections: [
        { phrases: phrasesFor(["jim", "bill"]) },
        { phrases: phrasesFor(["mandy", "karen"]) },
      ],
    };
    expect(compilePromptWithoutVariables(state)).toBe(
      "one, two, three\nADDBASE\njim, bill\nADDROW\nmandy, karen"
    );
  });

  test("should only use active phrases", () => {
    const state = {
      phrases: phrasesFor(["one", "two", "three"]),
      auxSections: [
        { phrases: [...phrasesFor(["jim", "bill"]), { active: false, value: "yoho" }] },
        { phrases: phrasesFor(["mandy", "karen"]) },
      ],
    };
    expect(compilePromptWithoutVariables(state)).toBe(
      "one, two, three\nBREAK\njim, bill\nBREAK\nmandy, karen"
    );
  });
});

describe("compilePrompt with variables", () => {
  test("should insert variable into string", () => {
    const compile = compilePrompt([{ key: "color", value: "blue" }]);
    const emptyState = { phrases: phrasesFor(["one ^color three"]) };
    expect(compile(emptyState)).toBe("one blue three");
  });

  test("should insert variable if its just one", () => {
    const compile = compilePrompt([{ key: "color", value: "blue" }]);
    const emptyState = { phrases: phrasesFor(["one", "^color", "three"]) };
    expect(compile(emptyState)).toBe("one, blue, three");
  });

  test("should insert variable for all stop characters", () => {
    const compile = compilePrompt([{ key: "c", value: "P" }]);
    const emptyState = { phrases: phrasesFor(["^c,^c.^c;^c:^c[^c]^c(^c)^c{^c}^c|^c ^c"]) };
    expect(compile(emptyState)).toBe("P,P.P;P:P[P]P(P)P{P}P|P P");
  });
});
