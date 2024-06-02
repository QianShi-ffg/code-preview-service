import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomException } from '../exceptions/custom.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception,host)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = status;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = (exception.getResponse() as any).message || exception.message;
    }

    if (exception instanceof CustomException) {
      errorCode = exception.getErrorCode() ? exception.getErrorCode() : status;
    }

    // 自定义错误响应格式
    const errorResponse = {
      code: errorCode,
      message: message,
      requestPath: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(errorCode).json(errorResponse);
  }
}
