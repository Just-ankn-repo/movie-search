/* global document */

import $on from '../utils/setListener';

export default (controller) => {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  const search = () => {
    controller.setPage(searchInput.value);
  };

  (function onSearch() {
    $on(searchButton, 'click', search);
  }());
}