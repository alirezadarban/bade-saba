import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CrudService } from '../services/crud.service';
import globalValues from '../globalValues';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private crudService: CrudService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
  }

  public async findOne(username: string, password: string) {
    try {
      const user = await this.crudService.findAll(
        globalValues.db.collections.users.name,
        { username },
      );
      const result = { user: null, error: 'username or password is wrong' };
      if (user.length > 0) {
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (isMatch) {
          result.user = user[0];
          result.error = null;
        }
      }
      return globalValues.response(
        '/authentication',
        !result.error,
        result,
        HttpStatus.OK);
    } catch (e) {
      return globalValues.response(
        '/authentication',
        false,
        {error: e.message},
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
