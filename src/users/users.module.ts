import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '../app.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CrudService } from '../services/crud.service';
import { User, UserSchema} from './schemas/user.schema';


@Module({
  imports: [
    forwardRef(() => AppModule),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [UsersController],
  providers: [UsersService, CrudService]
})
export class UsersModule {}
