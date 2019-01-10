import { Router } from 'express';
import { PostController } from '../controller/PostController';

export class Index extends PostController {

  public router: Router;

  constructor() {
      super();
      this.router = Router();
      this.routes();
  }

  public routes() {
    this.router.get('/', this.all);
    this.router.get('/:slug', this.one);
    this.router.post('/', this.create);
    this.router.put('/:slug', this.update);
    this.router.delete('/:slug', this.delete);
  }

}
