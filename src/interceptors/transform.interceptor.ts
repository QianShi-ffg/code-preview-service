import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    console.log(context.switchToHttp().getResponse());
    return next.handle().pipe(
      map((data) => ({
        data,
        code: context.switchToHttp().getResponse().statusCode,
        message: 'success',
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
