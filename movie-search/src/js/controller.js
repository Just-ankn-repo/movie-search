import View from './view';

export default class Controller {
  constructor(model) {
    this.model = model;
    this.view = new View(this);
    this.search = '';
    this.page = 1;
    this.update = true;
  }

  async setPage(_search) {
    if (_search !== null) {
      this.search = _search;
      this.page = 1;
      this.update = true;
    }
    this.view.render(await this.model.searchMovies(this.search, this.page), this.update);
    this.update = false;
  }

  nextPage() {
    this.page += 1;
    this.setPage(null);
  }
}
