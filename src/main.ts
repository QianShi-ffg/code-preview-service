import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局中间件
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.url, 'reqreqreqreqreqreq');
    next();
    console.log(12121);
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();
  await app.listen(3055);
}
bootstrap();
