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
    <n-h2>Prompt</n-h2>
    <n-input
      class="prompt-output"
      type="textarea"
      :autosize="{ minRows: 10 }"
      :value="prompt"
      round
      @click="copyToClipboard"
    />
    <n-h2>Negative</n-h2>
    <n-input
      class="prompt-output"
      type="textarea"
      :autosize="{ minRows: 5 }"
      :value="negative"
      round
    />
    <n-h2>ADetailer</n-h2>
    <n-input
      class="prompt-output"
      type="textarea"
      :autosize="{ minRows: 5 }"
      :value="aDetailer"
      round
    />
    <n-h2>ADetailer Negative</n-h2>
    <n-input
      class="prompt-output"
      type="textarea"
      :autosize="{ minRows: 5 }"
      :value="aDetailerNegative"
      round
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
