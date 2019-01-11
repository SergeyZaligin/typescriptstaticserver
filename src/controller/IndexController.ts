import { Request, Response } from 'express';


export class IndexController {

  public index(_: Request, res: Response) {
    res.render('index', {
        title: 'Главная страница',
        meta: {
          description: 'Главная страница',
          keywords: 'Главная страница',
        }
      });
  }

}
