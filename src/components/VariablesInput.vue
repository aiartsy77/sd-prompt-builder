<script setup>
import { storeToRefs } from "pinia";
import { newVariable } from "../scripts/newVariable.js";
import { focusNextInput } from "../scripts/focusNextInput.js";
import { usePromptStore } from "../store.js";

const store = usePromptStore();
const { variables, activeEmbeddings } = storeToRefs(store);

const activeEmbeddingOptions = activeEmbeddings.value.map((e) => ({
  label: e.name,
  value: e.name,
}));

const handleEnterOnVariableKey = (event, key) => {
  if (key) focusNextInput(event);
};

const handleEnterOnVariableValue = async (event, index) => {
  variables.value.splice(index + 1, 0, newVariable());
  event.target.blur();
  await new Promise((res) => setTimeout(res, 30));
  focusNextInput(event);
};
</script>

<template>
  <n-dynamic-input
    v-model:value="variables"
    placeholder="Please type prompt phrase here"
    :on-create="() => newVariable()"
  >
    <template #default="{ value, index }">
      <div style="display: flex; align-items: center; width: 100%; gap: 1rem">
        <n-radio-group
          v-model:value="value.variableType"
          :name="`radiobuttongroupv-${index}`"
          size="small"
        >
          <n-radio-button
            v-for="vartype in ['T', 'E']"
            :key="vartype"
            :value="vartype"
            :label="vartype"
            style="padding-left: 8px; padding-right: 8px"
          />
        </n-radio-group>
        <n-input
          v-model:value="value.key"
          type="text"
          placeholder="Enter variable key"
          @keydown.enter="(event) => handleEnterOnVariableKey(event, value.key)"
        />
        <n-input
          v-if="value.variableType == 'T'"
          v-model:value="value.value"
          type="text"
          placeholder="Enter variable value"
          @keydown.enter="(event) => handleEnterOnVariableValue(event, index)"
        />
        <n-select
          v-if="value.variableType == 'E'"
          :options="activeEmbeddingOptions"
          v-model:value="value.value"
        >
        </n-select>
      </div>
    </template>
  </n-dynamic-input>
</template>
