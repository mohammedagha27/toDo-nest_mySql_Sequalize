import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { response } from 'express';
import { map, Observable } from 'rxjs';
import { PageInfoQueryDTO } from 'src/modules/tasks/dto/pageInfo.dto';
import { resourceLimits } from 'worker_threads';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../constants';
import { toNumber } from '../utils/cast';

@Injectable()
export class PageInfoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { limit, offset } = request.query;
    return next.handle().pipe(
      map((data) => {
        const pageInfo: PageInfoQueryDTO = {
          offset: toNumber(offset, DEFAULT_OFFSET),
          limit: toNumber(limit, DEFAULT_LIMIT),
        };
        const newResponse = {
          data,
          pageInfo,
        };
        return newResponse;
      }),
    );
  }
}
