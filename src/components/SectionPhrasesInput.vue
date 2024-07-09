<script setup>
import { newPhrase } from "../scripts/newPhrase.js";
import { storeToRefs } from "pinia";
import { usePromptStore } from "../store.js";

const model = defineModel();
const { isNegative } = defineProps(["isNegative"]);
const store = usePromptStore();
const phraseTypes = ["T", "V", "E"];
const { activeVariables, postiveEmbeddings, negativeEmbeddings } = storeToRefs(store);

const embeddingOptions = isNegative ? negativeEmbeddings : postiveEmbeddings;

const handleEnter = async (event, index, val) => {
  model.value.splice(index + 1, 0, newPhrase());
  event.target.blur();
  await new Promise((res) => setTimeout(res, 30));
  const inputs = document.getElementsByClassName("n-input__input-el");
  let focusNext = false;
  for (let input of inputs) {
    if (focusNext) {
      input.focus();
      break;
    }
    if (input === event.target) {
      focusNext = true;
    }
  }
};
</script>

<template>
  <n-dynamic-input
    placeholder="Please type prompt phrase here"
    :on-create="() => newPhrase()"
    v-model:value="model"
  >
    <template #default="{ value, index }">
      <div style="display: flex; align-items: center; width: 100%">
        <n-checkbox v-model:checked="value.active" style="margin-right: 12px" />
        <n-radio-group
          v-model:value="value.phraseType"
          name="radiobuttongroup1"
          style="margin-right: 12px"
        >
          <n-radio-button
            v-for="phrasetype in phraseTypes"
            :key="phrasetype"
            :value="phrasetype"
            :label="phrasetype"
          />
        </n-radio-group>
        <n-input
          v-if="value.phraseType == 'T'"
          v-model:value="value.textValue"
          type="text"
          @keydown.enter="(event) => handleEnter(event, index, value.value)"
        />
        <n-select
          v-if="value.phraseType == 'V'"
          v-model:value="value.variableName"
          :options="activeVariables"
          label-field="key"
          value-field="key"
        />
        <n-select
          v-if="value.phraseType == 'E'"
          v-model:value="value.embedding"
          :options="embeddingOptions"
          label-field="name"
          value-field="name"
        />
      </div>
    </template>
  </n-dynamic-input>
</template>
