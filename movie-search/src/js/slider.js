import { Swiper, Navigation } from './utils/swiper';

Swiper.use([Navigation]);

const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  preloadImages: true,
  updateOnImagesReady: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    720: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1080: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

export default swiper;
