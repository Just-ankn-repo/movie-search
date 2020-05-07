/* global document */

import '../css/swiper.css';
import '../css/style.css';
import '../css/header.css';
import '../css/page.css';
import '../css/footer.css';
import $slideTpl from './templates/slideTpl';
import $on from './listeners/index';
import $swiper from './slider';

export default class View {
  constructor(_controller) {
    this.controller = _controller;
    this.on = $on;
    this.slideTpl = $slideTpl;
    this.swiper = $swiper;
    this.data = {};
    this.initial = true;
    this.nextPage = () => this.controller.nextPage();
    this.init();
  }

  init() {
    this.on.$onSearch(this.controller);
  }

  async render(data, update) {
    this.swiper.off('reachEnd', this.nextPage);

    try {
      this.data = await data;
      const newSlides = Promise.all(this.data.map((element) => this.slideTpl(element)));

      if (update === true && await newSlides) this.swiper.removeAllSlides();

      this.swiper.appendSlide(await newSlides);
      this.swiper.on('reachEnd', this.nextPage);
    } catch (error) {
      throw new Error(error);
    }

    if (this.initial === true) {
      document.getElementById('page-loader').style.display = 'none';
      this.initial = false;
    }
  }
}
