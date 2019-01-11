import { Router } from 'express';
import { IndexController } from '../controller/IndexController';

export class Index extends IndexController {

  public router: Router;

  constructor() {
      super();
      this.router = Router();
      this.routes();
  }

  public routes() {
    this.router.get('/', this.index);
  }

}
