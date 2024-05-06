import MessageConstants from '@constants/response.constants';
import MyMoviesException from 'src/custom-exceptions/my-movies.exception';

export class QueueErrorLogParser {
  /**
   * Parse queue error details
   */
  async errorLogParser(
    errorData: any,
    errorObject: any,
    id: string,
    serviceCode: number
  ) {
    console.log(errorObject);
    const errorDetails: MyMoviesException = {
      message: errorObject.message || MessageConstants.general.somethingWrong,
      type: 'InternalServerError',
      stackTrace: errorObject.stack || new Error().stack,
      name: '',
      smTraceId: id,
      detailedMessage: errorObject.message,
      level: 'error',
      errorCode: errorObject.errorCode || 500,
      serviceCode,
      statusCode: 500,
      requestObject: errorData,
    };
    const { name, ...errorDetail } = errorDetails;
    return errorDetail;
  }
}
