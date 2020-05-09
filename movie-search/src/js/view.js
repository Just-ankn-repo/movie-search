/* global document */

import '../css/swiper.css';
import '../css/style.css';
import '../css/header.css';
import '../css/page.css';
import '../css/footer.css';
import $slideTpl from './templates/slideTpl';
import $on from './listeners/index';
import $swiper from './slider';
import $nextPage from './utils/nextPage';

export default class View {
  constructor(_controller) {
    this.controller = _controller;
    this.on = $on;
    this.slideTpl = $slideTpl;
    this.swiper = $swiper;
    this.data = {};
    this.initial = true;
    this.pageNotify = document.querySelector('.notification__text');
    this.nextPage = () => $nextPage(this.controller);
    this.init();
  }

  init() {
    document.getElementById('search-input').focus();
    this.on.$onSearch(this.controller);
  }

  async render(data, update, error) {
    if (error) {
      this.pageNotify.innerHTML = error.message;
      document.querySelector('.search-input_loader').style.display = 'none';
      document.getElementById('page-loader').style.display = 'none';
      document.querySelector('.swiper-button-next').classList.remove('mini-loader');
    } else {
      this.swiper.off('reachEnd', this.nextPage);

      this.data = await data;
      const newSlides = Promise.all(this.data.map((element) => this.slideTpl(element)));
      if (await newSlides && update === true) {
        this.swiper.removeAllSlides();
        document.querySelector('.search-input_loader').style.display = 'none';
      }
      this.swiper.appendSlide(await newSlides);

      if (this.initial === true) {
        document.getElementById('page-loader').style.display = 'none';
        this.initial = false;
      }

      document.querySelector('.swiper-button-next').classList.remove('mini-loader');
      this.swiper.on('reachEnd', this.nextPage);
    }
  }
}
