export function changeText(text) {
  return {
    type: "CHANGE_TEXT",
    payload: text
  };
}

export function submitForm(text) {
  return {
    type: "SUBMIT_FORM",
    payload: text
  };
}
