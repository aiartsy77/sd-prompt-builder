<script setup>
import { ref } from "vue";
import { saveState } from "../../scripts/storageManager.js";
import { usePromptStore, initialState } from "../../store.js";

const showModal = defineModel("show");
const store = usePromptStore();

const saveName = ref(""); // todo: get name if it's a loaded state

function submitCallback() {
  saveState(localStorage)(saveName.value, store.$state);
  saveName.value = "";
}
</script>

<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Save state"
    content="Save state"
    positive-text="Save"
    negative-text="Cancel"
    @positive-click="submitCallback"
  >
    <n-card :bordered="false" size="small" role="dialog" aria-modal="true">
      <n-input placeholder="Save as" v-model:value="saveName" round />
    </n-card>
  </n-modal>
</template>

<style scoped></style>
