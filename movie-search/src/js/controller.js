import View from './view';

export default class Controller {
  constructor(model) {
    this.model = model;
    this.view = new View(this);
    this.search = '';
    this.page = 1;
  }

  async setPage(_search, _update, _message) {
    const [search, page] = [this.search, this.page];
    let [update, data, newError] = [_update];

    if (_search !== null) {
      this.search = _search;
      this.page = 1;
    }
    
    try {
      data = await this.model.getMovies(this.search, this.page);
    } catch (error) {
      [this.search, this.page, update, newError] = [search, page, false, error];
    }

    this.view.render(data || null, update, _message || null, newError || null);
  }

  nextPage() {
    this.page += 1;
    this.setPage(null);
  }
}
