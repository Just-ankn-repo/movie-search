import { Swiper, Navigation } from './utils/swiper';

Swiper.use([Navigation]);

const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1920: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});

export default swiper;
