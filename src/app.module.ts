import { Module, forwardRef, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import globalValues from './globalValues';
import { LoggerMiddleware } from './logger.middleware';
import { UsersController } from './users/users.controller';
import { AuthenticationController } from './authentication/authentication.controller';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forRoot(globalValues.db.address),
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AuthenticationController);
  }
}
