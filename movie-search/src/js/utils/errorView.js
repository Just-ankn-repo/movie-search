export default (_constants, _error, _message) => {
  if (_error !== null) {
    _constants.pageNotify.innerHTML = _error.message;
    _constants.pageNotify.parentElement.classList.add('active');
    _constants.searchInputLoader.style.display = 'none';
    _constants.pageLoader.style.display = 'none';
    _constants.swipperButtonNext.classList.remove('mini-loader');
  } else if (_message !== null) {
    _constants.pageNotify.innerHTML = _message;
    _constants.pageNotify.parentElement.classList.add('active');
  } else {
    _constants.pageNotify.parentElement.classList.remove('active');
    _constants.pageNotify.innerHTML = '';
  }
}
