/* global document */

import $on from '../utils/setListener';
import $yaTranslate from '../utils/YaTranslateApi';

export default (controller) => {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const searchLoader = document.querySelector('.search-input_loader');

  const bySearchButton = async () => {
    if (searchInput.value.length !== 0) {
      searchLoader.style.display = '';
      let text = searchInput.value;
      if (searchInput.value.match(/[а-я]/ig) !== null) {
        const translate = await $yaTranslate(searchInput.value);
        text = await translate.text;
        const message = `Showing results for '${text}'`;
        controller.setPage(text, true, message);
        text = searchInput.value;
      } else {
        controller.setPage(text, true);
      }
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
