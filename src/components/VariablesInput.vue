<script setup>
import { newVariable } from "../scripts/newVariable.js";
import { focusNextInput } from "../scripts/focusNextInput.js";
import { storeToRefs } from "pinia";
import { usePromptStore } from "../store.js";

const store = usePromptStore();
const { variables } = storeToRefs(store);

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
        <n-input
          v-model:value="value.key"
          type="text"
          placeholder="Enter variable key"
          @keydown.enter="(event) => handleEnterOnVariableKey(event, value.key)"
        />
        <n-input
          v-model:value="value.value"
          type="text"
          placeholder="Enter variable value"
          @keydown.enter="(event) => handleEnterOnVariableValue(event, index)"
        />
      </div>
    </template>
  </n-dynamic-input>
</template>
