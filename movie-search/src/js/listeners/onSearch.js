/* global document */

import $on from '../utils/setListener';
import $yaTranslate from '../utils/YaTranslateApi';

export default (controller) => {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const searchLoader = document.querySelector('.search-input_loader');
  const pageNotify = document.querySelector('.notification__text');

  const bySearchButton = async () => {
    if (searchInput.value.length !== 0) {
      searchLoader.style.display = '';
      let text;
      if (searchInput.value.match(/[а-я]/ig) === null) {
        text = searchInput.value;
      } else {
        const translate = await $yaTranslate(searchInput.value);
        text = await translate.text;
        pageNotify.innerHTML = `Showing results for '${text}'`;
      }
      controller.setPage(text, true);
    }
  };

  const byEnterKey = (event) => {
    if (event.key === 'Enter') {
      searchButton.click();
    }
  };

  (function onSearch() {
    $on(searchButton, 'click', bySearchButton);
    $on(searchInput, 'keydown', byEnterKey);
  }());
};
