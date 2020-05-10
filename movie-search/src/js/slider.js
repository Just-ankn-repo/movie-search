import { Swiper, Navigation, Keyboard } from './utils/swiper';

Swiper.use([Navigation, Keyboard]);

const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    720: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
    1366: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

export default swiper;
