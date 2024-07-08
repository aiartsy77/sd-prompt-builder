const saveNamesKey = "save_names";

const createSaveKey = (saveName) => `save_${saveName}`;

export const getSaveNames = (storage) => {
  const rawSaveNames = storage.getItem(saveNamesKey);
  if (!rawSaveNames) return [];
  return JSON.parse(rawSaveNames);
};

export const saveState = (storage) => (name, state) => {
  const saveKey = createSaveKey(name);
  storage.setItem(saveKey, JSON.stringify(state));
  const saveNames = getSaveNames(storage);
  const mySet = new Set(saveNames);
  mySet.add(name);
  const toSave = Array.from(mySet);
  storage.setItem(saveNamesKey, JSON.stringify(toSave));
};

export const loadState = (storage) => (name) => {
  const saveKey = createSaveKey(name);
  let newObject = storage.getItem(saveKey);
  return JSON.parse(newObject);
};
