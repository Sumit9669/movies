// File imports
import { HttpService } from '@shared/http.service';
import { MessageConstants } from '@constants/response.constants';
import { GeneralHttpExceptions } from 'src/custom-exceptions/general-exceptions.constants';
import { CommonFunctions } from '@shared/common-functions';
import { SchemaSet } from '@constants/common.constants';
import app from '@server';
import { userSchema } from 'src/entitites/users.entity';
import * as jwt from 'jsonwebtoken';
import { isNull } from 'lodash';
import MyMoviesException from 'src/custom-exceptions/my-movies.exception';
const commonFunction = new CommonFunctions();

export class AuthService {
  httpService: HttpService;
  constructor() {
    this.httpService = new HttpService();
  }

  async login(payload: { username: string }) {
    let dbConn = app.get('DB');
    const db = await dbConn.useDb(
      'my_movies_list',
      app.get('mongoUseDbConfig')
    );
    dbConn = db;
    const userModel = await dbConn.model(SchemaSet.user.name, userSchema);

    const user = await userModel.findOne({ username: payload.username }).lean();
    if (isNull(user)) {
      throw new MyMoviesException(
        GeneralHttpExceptions.AuthenticationException,
        MessageConstants.general.invalidUser
      );
    }
    return {
      token: this.generateGlobalToken(user),
    };
  }

  /**
   * will generate the token information
   * @param user pass the user detail
   */
  generateGlobalToken(user: any) {
    const jwtSecret = process.env.JWT_SECRET || 'test';

    const token = jwt.sign({ _id: user._id.toString() }, jwtSecret, {
      expiresIn: '1 hours',
    });

    return token;
  }
}
