<script setup>
import { ref } from "vue";
import { darkTheme } from "naive-ui";
import { usePromptStore, initialState } from "./store.js";
import InputPromptModal from "./components/modals/InputPromptModal.vue";
import SaveStateModal from "./components/modals/SaveStateModal.vue";
import LoadStateModal from "./components/modals/LoadStateModal.vue";
import PromptConfig from "./components/PromptConfig.vue";
import NegPhrasesConfig from "./components/NegPhrasesConfig.vue";
import ADetailerConfig from "./components/ADetailerConfig.vue";
import ADetailerNegativeConfig from "./components/ADetailerNegativeConfig.vue";
import VariablesInput from "./components/VariablesInput.vue";
import EmbeddingsTab from "./components/EmbeddingsTab.vue";
import PromptsOutput from "./components/PromptsOutput.vue";

const store = usePromptStore();

const showModal = ref(false);
const showSaveModal = ref(false);
const showLoadModal = ref(false);

function resetState() {
  store.$state = initialState();
}
function saveState() {
  showSaveModal.value = true;
}
function loadState() {
  showLoadModal.value = true;
}
</script>

<template>
  <InputPromptModal v-model:show="showModal" />
  <SaveStateModal v-model:show="showSaveModal" />
  <LoadStateModal v-model:show="showLoadModal" />
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <n-card>
        <n-tabs type="line" animated>
          <n-tab-pane name="main" tab="Main">
            <PromptConfig />
          </n-tab-pane>
          <n-tab-pane name="negative" tab="Negative">
            <NegPhrasesConfig />
          </n-tab-pane>
          <n-tab-pane name="adetailer" tab="aDetailer">
            <ADetailerConfig />
          </n-tab-pane>
          <n-tab-pane name="adetailer-negative" tab="aDetailer Negative">
            <ADetailerNegativeConfig />
          </n-tab-pane>
          <n-tab-pane name="variables" tab="Variables">
            <VariablesInput />
          </n-tab-pane>
          <n-tab-pane name="embeddings" tab="Embeddings">
            <EmbeddingsTab />
          </n-tab-pane>
        </n-tabs>
      </n-card>
      <n-card>
        <n-space>
          <n-button @click="showModal = true">Parse prompt</n-button>
          <n-button @click="resetState">clear</n-button>
          <n-button @click="saveState">save</n-button>
          <n-button @click="loadState">load</n-button>
        </n-space>
      </n-card>
    </n-gi>
    <n-gi>
      <PromptsOutput />
    </n-gi>
  </n-grid>
</template>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
