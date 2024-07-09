<script setup>
import { usePromptStore } from "../store.js";
import { storeToRefs } from "pinia";

const store = usePromptStore();
const { prompt, negative, aDetailer, aDetailerNegative } = storeToRefs(store);

const copyToClipboard = (event) => {
  const text = event.target.value;
  if (text) {
    navigator.clipboard.writeText(text);
    console.log("Prompt copied to clipboard");
    return;
  }
  console.warn("Nothing to copy");
};
</script>

<template>
  <n-card>
    <n-h2 style="margin: 0">Prompt</n-h2>
    <n-input
      class="prompt-output"
      round
      style="border: 1px solid green"
      type="textarea"
      :autosize="{ minRows: 10 }"
      :value="prompt"
      @click="copyToClipboard"
    />
    <n-h2 style="margin: 0">Negative</n-h2>
    <n-input
      class="prompt-output"
      round
      status="error"
      type="textarea"
      :autosize="{ minRows: 5 }"
      :value="negative"
      @click="copyToClipboard"
    />
    <n-h2 style="margin: 0">ADetailer</n-h2>
    <n-input
      class="prompt-output"
      round
      style="border: 1px solid green"
      type="textarea"
      :autosize="{ minRows: 5 }"
      :value="aDetailer"
      @click="copyToClipboard"
    />
    <n-h2 style="margin: 0">ADetailer Negative</n-h2>
    <n-input
      class="prompt-output"
      round
      type="textarea"
      :autosize="{ minRows: 5 }"
      :value="aDetailerNegative"
      @click="copyToClipboard"
      status="error"
    />
  </n-card>
</template>

<style>
.prompt-output {
  cursor: copy;
}

.prompt-output .n-input__textarea-el {
  cursor: copy;
}
</style>
