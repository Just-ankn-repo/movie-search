/* global window document */
import $on from '../utils/setListener';

export default (keyboard, printKey) => {

  const onMouseDown = (event) => {
    if (event.target.classList[0] === 'key_button') {
      event.preventDefault();
      if (event.target.classList[1] === 'key_16') {
        if (keyboard.mods.shiftKey === 'off') {
          document.querySelector(`.${event.target.classList[1]}`).classList.add('active');
          keyboard.mods.change('shiftKey', 'on');
        } else if (keyboard.mods.shiftKey === 'on') {
          document.querySelector(`.${event.target.classList[1]}`).classList.remove('active');
          keyboard.mods.change('shiftKey', 'off');
        }
      }
      if (event.target.classList[1] === 'key_91') {
        if (keyboard.mods.lang === 'default') {
          keyboard.mods.change('lang', 'ru');
        } else if (keyboard.mods.lang === 'ru') {
          keyboard.mods.change('lang', 'default');
        }
      }
      if (!['key_16', 'key_91'].includes(event.target.classList[1])) {
        event.target.classList.add('active');
        printKey(window[event.target.classList[1]].content);
      }
    }
  };

  const onMouseUp = (event) => {
    event.preventDefault();
    document.body.querySelectorAll('.key_button').forEach((elem) => {
      if (elem.classList[1] !== 'key_16') {
        elem.classList.remove('active');
      }
    });
  };

  (function onSearch() {
    $on(document.body, 'mousedown', onMouseDown);
    $on(window, 'mouseup', onMouseUp);
  }());
};
