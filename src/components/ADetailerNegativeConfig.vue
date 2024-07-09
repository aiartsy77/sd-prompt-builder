<script setup>
import { usePromptStore } from "../store.js";
import { storeToRefs } from "pinia";
import SectionPhrasesInput from "./SectionPhrasesInput.vue";

const store = usePromptStore();
const { aDetailerNegPhrases } = storeToRefs(store);
</script>

<template>
  <SectionPhrasesInput v-model="aDetailerNegPhrases" />
</template>

<style scoped></style>
