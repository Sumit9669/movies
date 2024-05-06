import { Router } from 'express';
import MoviesRouter from './movies.routes';
import AuthRouter from './auth.routes';
class BaseRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.use('/', MoviesRouter);
    this.router.use('/', AuthRouter);
  }
}

export = new BaseRouter().router;
