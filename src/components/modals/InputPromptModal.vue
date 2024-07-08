<script setup>
import { ref } from "vue";
import { mergeDeepRight } from "ramda";
import { usePromptStore } from "../../store.js";
import { parsePrompt, parsePhrases } from "../../scripts/parsePrompt.js";

const store = usePromptStore();
const showModal = defineModel("show");

const inputPrompt = ref("");

function cancelCallback() {
  inputPrompt.value = "";
}
function submitCallback() {
  if (promptPart.value == "main") {
    const parsed = parsePrompt(inputPrompt.value);
    store.$state = mergeDeepRight(store.$state, parsed);
  }
  if (promptPart.value == "negative") {
    const parsedNeg = parsePhrases(inputPrompt.value);
    store.$state = mergeDeepRight(store.$state, { negPhrases: parsedNeg });
  }
  if (promptPart.value == "aDetailer") {
    const parsedNeg = parsePhrases(inputPrompt.value);
    store.$state = mergeDeepRight(store.$state, { aDetailerPhrases: parsedNeg });
  }
  if (promptPart.value == "aDetailer negative") {
    const parsedNeg = parsePhrases(inputPrompt.value);
    store.$state = mergeDeepRight(store.$state, { aDetailerNegPhrases: parsedNeg });
  }
  inputPrompt.value = "";
}

const options = ["main", "negative", "aDetailer", "aDetailer negative"];
const promptPart = ref(null);
</script>

<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Parse prompt"
    content="Are you sure?"
    positive-text="Parse"
    negative-text="Cancel"
    @positive-click="submitCallback"
    @negative-click="cancelCallback"
    style="width: 50%"
  >
    <n-card :bordered="false" size="small" role="dialog" aria-modal="true">
      <n-input
        type="textarea"
        :autosize="{ minRows: 25, minCols: 800 }"
        placeholder="Enter prompt here"
        v-model:value="inputPrompt"
        round
        clearable
      />
      <n-radio-group v-model:value="promptPart" name="radiogroup">
        <n-space>
          <n-radio v-for="option in options" :key="option" :value="option" :label="option" />
        </n-space>
      </n-radio-group>
    </n-card>
  </n-modal>
</template>

<style scoped></style>
