/* global fetch */
export default class Model {
  constructor() {
    this.data = {};
    this.rating = '';
    // this.apiKey = 'c246be43';
    this.apiKey = 'fc604359';
    this.apiUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}`;
  }

  async searchMovies(search, page) {
    try {
      const response = await fetch(`${this.apiUrl}&s=${search}&page=${page}`);
      this.data = await response.json();

      const newData = this.data.Search.map(async (item) => {
        const newItem = item;
        newItem.imdbRating = await this.searchRating(item.imdbID);
        return newItem;
      });

      return Promise.all(newData);
    } catch (error) {
      return error;
    }
  }

  async searchRating(imdbID) {
    try {
      const response = await fetch(`${this.apiUrl}&i=${imdbID}&plot=short`);
      this.rating = await response.json();
      return this.rating.imdbRating;
    } catch (error) {
      throw new Error(error);
    }
  }
}
