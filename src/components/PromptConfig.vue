<script setup>
import { usePromptStore } from "../store.js";
import { storeToRefs } from "pinia";
import SectionPhrasesInput from "./SectionPhrasesInput.vue";

const store = usePromptStore();
const { phrases, auxSections, useRegionalPromter } = storeToRefs(store);
</script>

<template>
  <n-card>
    <template #header>
      <n-space justify="space-between">
        <n-h3>Configuration</n-h3>
        <n-checkbox v-model:checked="useRegionalPromter" :style="{ marginRight: '12px' }">
          Regional prompter
        </n-checkbox>
      </n-space>
    </template>
    <SectionPhrasesInput v-model="phrases" />
    <n-divider />
    <n-space v-for="section in auxSections" vertical>
      <SectionPhrasesInput v-model:value="section.phrases" />
      <n-divider />
    </n-space>
    <template #action>
      <n-button @click="store.addSection()">Add section</n-button>
    </template>
  </n-card>
</template>

<style scoped></style>
