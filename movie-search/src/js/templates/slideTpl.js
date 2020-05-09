/* global document */

export default (_element) => new Promise((resolve) => {
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  slide.innerHTML = `<div class="slide__container">
                        <img class="slide__img" src="${_element.Poster}">
                        <div class="slide__bottom">
                          <a class="slide__title" href="https://www.imdb.com/title/${_element.imdbID}/videogallery/" target="_blank">${_element.Title}</a>
                          <p class="slide__year">Year: ${_element.Year}</p>
                          <p class="slide__rating">ImDb: ${_element.imdbRating}</p>
                        </div>
                    </div>`;
  const imgElement = slide.querySelector('.slide__img');
  imgElement.onload = () => resolve(slide);
  imgElement.onerror = () => {
    imgElement.src = './assets/img/poster-not-found.png';
    resolve(slide);
  };
});
