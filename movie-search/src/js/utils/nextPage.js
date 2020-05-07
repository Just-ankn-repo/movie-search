/* global document */

export default (_controller) => {
  document.querySelector('.swiper-button-next').classList.add('mini-loader');
  _controller.nextPage();
};
