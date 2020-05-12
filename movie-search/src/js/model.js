/* global fetch */
import $errors from './utils/errors';

export default class Model {
  constructor() {
    this.apiKey = 'c246be43';
    // this.apiKey = 'fc604359';
    this.apiUrl = `https://www.omdbapi.com/?apikey=${this.apiKey}`;
  }

  async getMovies(search, page) {
    let response;

    try {
      response = await fetch(`${this.apiUrl}&s=${search}&page=${page}`);
    } catch (error) {
      throw new Error($errors.connectionError());
    }

    const moviesList = await response.json();

    if (!response.ok || moviesList.Error) {
      throw new Error($errors.apiErrors(moviesList.Error, search));
    } else {
      return await Promise.all(moviesList.Search.map((movie) => this.addImdbRating(movie)))
    }
  }

  async addImdbRating(movie) {
    const movieInfo = movie;
    const response = await fetch(`${this.apiUrl}&i=${movieInfo.imdbID}&plot=short`);
    const movieDetails = await response.json();
    movieInfo.imdbRating = movieDetails.imdbRating || movieDetails.Error;
    return movieInfo;
  }
}
