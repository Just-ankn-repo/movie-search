import View from './view';

export default class Controller {
  constructor(model) {
    this.model = model;
    this.view = new View(this);
    this.search = '';
    this.page = 1;
  }

  async setPage(_search, update) {
    if (_search !== null) {
      this.search = _search;
      this.page = 1;
    }
    try {
      const data = await this.model.searchMovies(this.search, this.page)
      this.view.render(data, update);
    } catch (error) {
      this.view.render(null, update, error);
    }
  }

  nextPage() {
    this.page += 1;
    this.setPage(null);
  }
}
