<script setup>
import { storeToRefs } from "pinia";
import { usePromptStore } from "../store.js";
import { newEmbedding } from "../scripts/newEmbedding.js";
import { focusNextInput } from "../scripts/focusNextInput.js";

const store = usePromptStore();
const { embeddings } = storeToRefs(store);

const handleEnter = async (event, index) => {
  embeddings.value.splice(index + 1, 0, newEmbedding());
  event.target.blur();
  await new Promise((res) => setTimeout(res, 30));
  focusNextInput(event);
};

const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.background = "#d03050";
    if (focused) {
      style.boxShadow = "0 0 0 2px #d0305040";
    }
  } else {
    style.background = "#2080f0";
    if (focused) {
      style.boxShadow = "0 0 0 2px #2080f040";
    }
  }
  return style;
};
</script>

<template>
  <n-dynamic-input
    v-model:value="embeddings"
    placeholder="Enter embedding here"
    :on-create="() => newEmbedding()"
  >
    <template #default="{ value, index }">
      <div style="display: flex; align-items: center; width: 100%">
        <n-switch
          v-model:value="value.isNegative"
          style="margin-right: 12px"
          :rail-style="railStyle"
        >
          <template #checked> Negative </template>
          <template #unchecked> Positive </template>
        </n-switch>
        <n-input
          v-model:value="value.name"
          type="text"
          placeholder="Enter embedding"
          @keydown.enter="(event) => handleEnter(event, index)"
        />
      </div>
    </template>
  </n-dynamic-input>
</template>
