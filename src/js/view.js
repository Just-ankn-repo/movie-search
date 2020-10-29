/* global document */

import '../css/swiper.css';
import '../css/style.css';
import '../css/header.css';
import '../css/page.css';
import '../css/footer.css';
import './virtual-keyboard/index';
import $slideTpl from './templates/slideTpl';
import $on from './listeners/index';
import $swiper from './slider';
import $nextPage from './utils/nextPage';
import $constants from './utils/constants';
import $errorView from './utils/errorView';

export default class View {
  constructor(_controller) {
    this.controller = _controller;
    this.initial = true;
    this.pageNotify = document.querySelector('.notification__text');
    this.nextPage = () => $nextPage(this.controller, $constants.swipperButtonNext);
    this.init();
  }

  init() {
    $constants.searchInput.focus();
    $on.onKeyboard();
    $on.onSearch(this.controller);
  }

  async render(data, update, message, error) {
    if (error) {
      $errorView($constants, error, null)
    } else {
      $errorView($constants, null, message)
      $swiper.off('reachEnd', this.nextPage);
      const newSlides = Promise.all(data.map((element) => $slideTpl(element)));
      
      if (await newSlides && update === true) {
        $swiper.removeAllSlides();
        $swiper.update();
        $constants.searchInputLoader.style.display = 'none';
      }

      $swiper.appendSlide(await newSlides);

      if (this.initial === true) {
        $constants.pageLoader.style.display = 'none';
        this.initial = false;
      }

      $constants.swipperButtonNext.classList.remove('mini-loader');
      $swiper.on('reachEnd', this.nextPage);
    }
  }
}
