<script setup>
import { ref, watch } from "vue";
import { getSaveNames, loadState } from "../../scripts/storageManager.js";
import { usePromptStore } from "../../store.js";

const showModal = defineModel("show");
const saveOptions = ref([]);
const store = usePromptStore();

watch(showModal, (newValue) => {
  if (newValue) {
    const saveNames = getSaveNames(localStorage);
    saveOptions.value = saveNames.map((name) => ({ label: name, value: name }));
  }
});

const saveName = ref("");

function submitCallback() {
  const state = loadState(localStorage)(saveName.value);
  if (state) store.$state = state;
}
</script>

<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Load state"
    content="Load state"
    positive-text="Load"
    negative-text="Cancel"
    @positive-click="submitCallback"
  >
    <n-card :bordered="false" size="small" role="dialog" aria-modal="true">
      <n-select v-model:value="saveName" :options="saveOptions" />
    </n-card>
  </n-modal>
</template>

<style scoped></style>
