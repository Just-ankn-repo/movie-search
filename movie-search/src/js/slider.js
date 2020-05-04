import { Swiper, Navigation, Pagination } from './utils/swiper';

Swiper.use([Navigation, Pagination]);

const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
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
    }
  }
});

export default swiper;
