/* eslint-disable import/extensions */
/* global document window */

import KeyboardButton from './KeyboardButton.js';
import '../../css/keyboard.css';
import listeners from './keyboardListeners';
import printKey from './printKey';

export default class KeyboardFrame {
  constructor(keyCodes, keyboardMap) {
    this.selfObj = '';
    this.allButtons = '';
    this.keyCodes = keyCodes;
    this.keyboardMap = keyboardMap;
    this.mods = {
      shiftKey: 'off',
      lang: 'default',
      change: (mod, value) => {
        this.mods[mod] = value;
        this.refresh(this.mods);
      },
    };
  }

  init() {
    const keyboardElement = document.querySelector('.keyboard');
    this.selfObj = document.createElement('div');
    this.selfObj.className = 'keyboard_frame';
    for (let i = 0; i < this.keyboardMap.length; i += 1) {
      const keyboardRow = document.createElement('ul');
      keyboardRow.className = 'keyboard_row';
      keyboardRow.classList.add(`row_${i}`);
      for (let j = 0; j < this.keyboardMap[i].length; j += 1) {
        window[`key_${this.keyboardMap[i][j]}`] = new KeyboardButton(this.keyboardMap[i][j], keyboardRow, this.keyCodes);
        window[`key_${this.keyboardMap[i][j]}`].create(this.mods.lang);
        keyboardRow.append(window[`key_${this.keyboardMap[i][j]}`].selfObj);
      }
      this.selfObj.append(keyboardRow);
    }
    keyboardElement.append(this.selfObj);
    this.allButtons = document.querySelectorAll('.key_button');
    listeners(this, printKey);
  }

  refresh(mod) {
    this.mods = mod;
    this.allButtons.forEach((element) => {
      const keyId = element.classList[1].match(/\d+/g);
      if (this.mods.lang === 'default' || !this.keyCodes[keyId][this.mods.lang]) {
        if (this.keyCodes[keyId].shift && this.mods.shiftKey === 'on') {
          window[`key_${keyId}`].update(this.keyCodes[keyId].shift);
        } else {
          window[`key_${keyId}`].update(this.keyCodes[keyId].default);
        }
      } else if (this.mods.lang === 'ru' && this.keyCodes[keyId][this.mods.lang]) {
        if (this.mods.shiftKey === 'on') {
          window[`key_${keyId}`].update(this.keyCodes[keyId][this.mods.lang].shift);
        } else {
          window[`key_${keyId}`].update(this.keyCodes[keyId][this.mods.lang].default);
        }
      }
    });
  }
}
