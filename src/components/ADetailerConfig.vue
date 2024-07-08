<script setup>
import { usePromptStore } from "../store.js";
import { storeToRefs } from "pinia";
import SectionPhrasesInput from "./SectionPhrasesInput.vue";

const store = usePromptStore();
const { aDetailerPhrases } = storeToRefs(store);
</script>

<template>
  <SectionPhrasesInput v-model:value="aDetailerPhrases" />
</template>

<style scoped></style>
