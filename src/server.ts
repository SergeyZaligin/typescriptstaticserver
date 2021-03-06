import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as path from 'path';
import * as express from 'express';
import * as hbs from 'hbs';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';

import { UserController } from './controller/UserController';
import { Index } from './routes/Index';
const indexRouter = new Index();
const userRouter = new UserController();

hbs.registerPartials(path.join(__dirname, '../views/partials'));

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.app.set('view engine', 'hbs');
    this.app.set('view options', {
      layout: 'layouts/layout'
    });
  }

  public config(): void {
    dotenv.config({
      path: path.join(__dirname, '../.env')
    });
    mongoose.set('useCreateIndex', true);
    console.log('process.env.MONGO_URL', process.env.MONGO_URL);
    mongoose
      .connect(
        process.env.MONGO_URL,
        {
          useNewUrlParser: true
        }
      )
      .then(() => {
        console.log('Connection mongodb success!!!');
      })
      .catch((error) => console.log(error));

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

    this.app.use((_, res: express.Response, next: express.NextFunction) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
      );
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  public routes(): void {
    this.app.use('/', indexRouter.router);
    this.app.use('/users', userRouter.router);
  }
}

export default new Server().app;
