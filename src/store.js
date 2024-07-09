import { defineStore } from "pinia";
import { compilePrompt, phrasesToPromptSection } from "./scripts/compilePrompt.js";
import { newPhrase } from "./scripts/newPhrase.js";
import { newVariable } from "./scripts/newVariable.js";
import { newEmbedding } from "./scripts/newEmbedding.js";

const newSection = () => ({
  phrases: [newPhrase()],
});

export const initialState = () => ({
  useRegionalPromter: false,
  phrases: [newPhrase()],
  auxSections: [],
  negPhrases: [newPhrase()],
  aDetailerPhrases: [newPhrase()],
  aDetailerNegPhrases: [newPhrase()],
  variables: [newVariable()],
  embeddings: [newEmbedding()],
});

export const usePromptStore = defineStore("counter", {
  state: () => initialState(),
  getters: {
    prompt(state) {
      return compilePrompt(this.activeVariables)(state);
    },
    negative(state) {
      return phrasesToPromptSection(this.activeVariables)(state.negPhrases);
    },
    aDetailer(state) {
      return phrasesToPromptSection(this.activeVariables)(state.aDetailerPhrases);
    },
    aDetailerNegative(state) {
      return phrasesToPromptSection(this.activeVariables)(state.aDetailerNegPhrases);
    },
    activeVariables: (state) => state.variables.filter((v) => !!v.key && !!v.value),
    activeEmbeddings: (state) => state.embeddings.filter((e) => !!e.name),
    postiveEmbeddings: (state) => state.embeddings.filter((e) => !!e.name && !e.isNegative),
    negativeEmbeddings: (state) => state.embeddings.filter((e) => !!e.name && e.isNegative),
  },
  actions: {
    addSection() {
      this.auxSections.push(newSection());
    },
    addPhrase() {
      this.phrases;
    },
  },
});
