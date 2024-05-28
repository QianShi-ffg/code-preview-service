import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(
      '未登录,请登陆后再进行访问',
      context.getArgs()[1].req.url,
      context.getArgs()[1].req.method,
    );
    return false;
  }
}
