import { forwardRef, Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import { AppModule } from '../app.module';
import { CrudService } from '../services/crud.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    forwardRef(() => AppModule),
    UsersModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, CrudService]
})
export class AuthenticationModule {}
