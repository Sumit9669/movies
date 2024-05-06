// Module imports
import { Router, Request, Response } from 'express';
import { NextFunction } from 'express';
import { createValidator } from 'express-joi-validation';

// Files imports
import { MessageConstants } from '@constants/response.constants';
import { GeneralHttpExceptions } from 'src/custom-exceptions/general-exceptions.constants';
import MyMoviesException from 'src/custom-exceptions/my-movies.exception';
import { MoviesValidation } from 'src/schema-validations';
import { AuthService } from '../services';
import { checkJwt } from 'src/middlewares/check-token';
const validator = createValidator({ passError: true });
const basePath = '/auth';
const authSvc = new AuthService();
class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post(
      `/login`,
      [validator.body(MoviesValidation.loginRequest)],
      this.login
    );
  }

  /**
   * @swagger
   *  /login/:
   *  post:
   *   summary: To create login token
   *   description: api to allow user to create login token
   *   tags: [Auth-APIs]
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *        type: object
   *        properties:
   *          username:
   *            type: string
   *            required: true
   *   responses:
   *    '200':
   *       description: success
   *
   *
   */

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authSvc.login(req.body);
      return res.json({
        status: true,
        message: MessageConstants.general.saved,
        data: result,
      });
    } catch (error: any) {
      // To check if error type is internal server error or not
      if (error instanceof MyMoviesException) {
        throw error;
      } else {
        throw new MyMoviesException(
          GeneralHttpExceptions.InternalServerException,
          error.message,
          error.stackTrace || error.stack,
          error
        );
      }
    }
  }
}
export = new AuthRouter().router;
