import { Request, Response, NextFunction } from 'express';
// import { RedisService } from "../shared/redis.service";
import { HttpStatusCodes } from 'src/enums/common-enums';
import * as jwt from 'jsonwebtoken';

import MyMoviesException from 'src/custom-exceptions/my-movies.exception';
import { GeneralHttpExceptions } from 'src/custom-exceptions/general-exceptions.constants';
import MessageConstants from '@constants/response.constants';
import { ExceptionsTerminology, SchemaSet } from '@constants/common.constants';
import { IUser } from 'src/entitites/interfaces/movies.interface';
import app from '@server';
const jwtSecret = process.env.JWT_SECRET || '';

/**
 * Middle ware to verify the Authentication Token Coming along with request express
 * @param req  request express
 * @param res  response Express
 * @param next next express
 */
export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let dbConn = app.get('DB');
  const db = await dbConn.useDb('my_movies_list', app.get('mongoUseDbConfig'));
  dbConn = db;
  let token = req.headers.authorization as string;
  if (!token) {
    next(
      new MyMoviesException(
        GeneralHttpExceptions.InvalidJWTToken,
        MessageConstants.general.invalidJWT,
        new Error().stack
      )
    );
  }

  token = token.replace('Bearer ', '');
  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, jwtSecret) as any;
    let user: any | undefined | null;
    // const redisRes = await RedisService.getValue(jwtPayload._id);
    // if (redisRes) {
    //   user = JSON.parse(redisRes);
    // }
    if (!user) {
      const userModels = await dbConn.model(
        SchemaSet.user.name,
        SchemaSet.user.schema
      );
      user = await userModels.findById(jwtPayload._id).lean();
    }
    if (!user) {
      res.status(HttpStatusCodes.unauthorized).send();
      return;
    }

    // adding user along with req variable for further processing
    (req as any).headers.userId = user._id;
  } catch (error: any) {
    const errorResponse = {
      status: false,
      message: MessageConstants.general.invalidJWT,
      error: {
        type: ExceptionsTerminology.jwtError,
        message: MessageConstants.general.invalidJWT,
        errorCode: 1012,
        serviceCode: process.env.FAI_AUTH_SERVICE_CODE,
      },
    };

    return res.status(HttpStatusCodes.unauthorized).json(errorResponse);
  }
  next();
};
