/* global document Event */

export default (content) => {
  const inputElement = document.getElementById('search-input');
  const cursorPosition = inputElement.selectionStart;

  inputElement.focus();
  if (content === 'Enter') {
    const event = new Event('keydown');
    event.key = 'Enter';
    inputElement.dispatchEvent(event);
  } else if (content === '―') {
    inputElement.setRangeText(' ', cursorPosition, inputElement.selectionEnd, 'end');
  } else if (content === 'Del') {
    if (cursorPosition === inputElement.selectionEnd) {
      inputElement.setRangeText('', cursorPosition, cursorPosition + 1, 'end');
    } else {
      inputElement.setRangeText('', cursorPosition, inputElement.selectionEnd, 'end');
    }
  } else if (content === 'Backspace') {
    if (cursorPosition === inputElement.selectionEnd && cursorPosition !== 0) {
      inputElement.setRangeText('', cursorPosition - 1, cursorPosition, 'end');
    } else {
      inputElement.setRangeText('', cursorPosition, inputElement.selectionEnd, 'end');
    }
  } else if (content === '⬅') {
    inputElement.selectionStart = cursorPosition - 1;
    inputElement.selectionEnd = inputElement.selectionStart;
  } else if (content === '➡') {
    inputElement.selectionStart = cursorPosition + 1;
    inputElement.selectionEnd = inputElement.selectionStart;
  } else {
    inputElement.setRangeText(content, cursorPosition, inputElement.selectionEnd, 'end');
  }
  inputElement.focus();
};
