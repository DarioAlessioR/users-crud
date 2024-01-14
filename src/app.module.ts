import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { LoggerModule } from 'nestjs-pino';
import { MiddlewareConsumer } from '@nestjs/common';
import { CORRELATION_ID_HEADER, CorrelationIdMiddleware } from './correlation-id/correlation-id.middleware';
import { Request } from 'express';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './users/config-loader';
import { config, env } from 'process';
import { envSchema } from './users/env-schema';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LoggerModule.forRoot(
    {
      pinoHttp: {
        transport: 
          process.env.NODE_ENV === 'development' 
            ? {
                target: 'pino-pretty',
                options: {
                  messageKey: 'message',
                },
              }
            : undefined,
        messageKey: 'message',
        customProps: (req: Request ) => {
          return {
            correlationId: req[CORRELATION_ID_HEADER],
          };
        },
        autoLogging: false,
        serializers: {
          req: () => {
            return undefined;
          },
          res: () => {
            return undefined;
          },
        },
      },
    },
  ),
  ConfigModule.forRoot({
    load: [configLoader],
    validationSchema: envSchema,
  }),
  AuthModule
],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
