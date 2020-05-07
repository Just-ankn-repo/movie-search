import Controller from './controller';
import Model from './model';

const model = new Model();
const controller = new Controller(model);

controller.setPage('dream');
