<script setup>
import { usePromptStore } from "../store.js";
import { storeToRefs } from "pinia";
import SectionPhrasesInput from "./SectionPhrasesInput.vue";

const store = usePromptStore();
const { negPhrases } = storeToRefs(store);
</script>

<template>
  <SectionPhrasesInput v-model:value="negPhrases" />
</template>

<style scoped></style>
