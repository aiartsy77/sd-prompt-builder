export function focusNextInput(event) {
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
}
