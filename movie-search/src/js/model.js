/* global fetch */
import $errors from './utils/errors';

export default class Model {
  constructor() {
    this.data = {};
    this.rating = '';
    // this.apiKey = 'c246be43';
    this.apiKey = 'fc604359';
    this.apiUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}`;
  }

  async searchMovies(search, page) {
    let response;
    try {
      response = await fetch(`${this.apiUrl}&s=${search}&page=${page}`);
    } catch (error) {
      throw new Error($errors.connectionError());
    }
    this.data = await response.json();
    if (!response.ok || this.data.Error) {
      throw new Error($errors.apiErrors(this.data.Error, search));
    } else {
      const newData = this.data.Search.map(async (item) => {
        const newItem = item;
        newItem.imdbRating = await this.searchRating(item.imdbID);
        return newItem;
      });
      return Promise.all(newData);
    }
  }

  async searchRating(imdbID) {
    const response = await fetch(`${this.apiUrl}&i=${imdbID}&plot=short`);
    this.rating = await response.json();
    if (this.rating.Response === 'False') {
      return this.rating.Error;
    }
    return this.rating.imdbRating;
  }
}
