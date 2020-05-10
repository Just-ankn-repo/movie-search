/* global document */

import $on from '../utils/setListener';

export default () => {
  const keyboardButton = document.getElementById('keyboard-button');
  const keyboardElement = document.querySelector('.keyboard');

  const keyboardVisible = () => {
    if (keyboardElement.classList.contains('active')) {
      keyboardElement.classList.remove('active');
    } else {
      keyboardElement.classList.add('active');
    }
  };

  (function onVirtualKeyboard() {
    $on(keyboardButton, 'click', keyboardVisible);
  }());
};
