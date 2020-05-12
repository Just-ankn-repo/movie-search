/* global document */

export default (_controller, _element) => {
  _element.classList.add('mini-loader');
  _controller.nextPage();
};
