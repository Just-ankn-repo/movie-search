/* global document */

import $on from '../utils/setListener';

export default (controller) => {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  const bySearchButton = () => {
    if (searchInput.value.length !== 0) {
      controller.setPage(searchInput.value);
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
