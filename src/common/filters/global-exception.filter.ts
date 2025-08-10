import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { GraphQLError } from 'graphql';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const gqlContext = gqlHost.getContext<{ req: Request }>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_ERROR';

    // HTTP Exception 처리
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      message = typeof response === 'string' ? response : (response as { message?: string })?.message || message;
      code = (response as { code?: string })?.code || 'HTTP_ERROR';
    }
    // GraphQL Error 처리
    else if (exception instanceof GraphQLError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      code = (exception.extensions?.code as string) || 'GRAPHQL_ERROR';
    }
    // 일반 Error 처리
    else if (exception instanceof Error) {
      message = exception.message;
      code = 'GENERAL_ERROR';
    }

    // 에러 로깅
    this.logger.error(
      `Exception occurred: ${message}`,
      exception instanceof Error ? exception.stack : 'Unknown error',
      gqlContext?.req?.url || 'GraphQL',
    );

    // GraphQL 에러 응답
    if (gqlContext?.req) {
      throw new GraphQLError(message, {
        extensions: {
          code,
          status,
        },
      });
    }

    // HTTP 에러 응답
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(status).json({
      statusCode: status,
      message,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
