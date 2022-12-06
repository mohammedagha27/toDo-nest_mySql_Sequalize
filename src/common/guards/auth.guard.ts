import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verifyToken } from 'src/common/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

function validateRequest(
  request: any,
): boolean | Promise<boolean> | Observable<boolean> {
  const { authorization } = request.headers;
  if (!authorization) return false;
  const decoded = verifyToken(authorization, process.env.SECRET_KEY);
  if (!decoded) {
    return false;
  }
  return true;
}
