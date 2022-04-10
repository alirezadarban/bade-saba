import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CrudService } from '../services/crud.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import globalValues from '../globalValues';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private crudService: CrudService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
  }

  public async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.username = createUserDto.username.toLowerCase();
      const duplicatedUsername = await this.findAll({ username: createUserDto.username });
      if (duplicatedUsername.result.length > 0) {
        return globalValues.response(
          '/users',
          false,
          { error: 'username not available!' },
          HttpStatus.OK);
      }

      const saltOrRounds = 10;
      createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
      await this.crudService.create(
        globalValues.db.collections.users.name,
        createUserDto,
      );
      return globalValues.response(
        '/users',
        true,
        {},
        HttpStatus.OK);
    } catch (e) {
      return globalValues.response(
        '/users',
        false,
        { error: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(query = {}) {
    try {
      const users = await this.crudService.findAll(
        globalValues.db.collections.users.name,
        query,
      );
      return globalValues.response(
        '/users',
        true,
        users,
        HttpStatus.OK);
    } catch (e) {
      return globalValues.response(
        '/users',
        false,
        { error: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
      let result = await this.crudService.updateOne(
        globalValues.db.collections.users.name,
        { _id: id },
        updateUserDto,
      );
      return globalValues.response(
        '/users',
        Boolean(result.matchedCount),
        result,
        HttpStatus.OK);
    } catch (e) {
      return globalValues.response(
        '/users',
        false,
        { error: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async remove(id: string) {
    try {
      let result = await this.crudService.findOneAndDelete(
        globalValues.db.collections.users.name,
        { _id: id },
      );
      return globalValues.response(
        '/users',
        true,
        result,
        HttpStatus.OK);
    } catch (e) {
      return globalValues.response(
        '/users',
        false,
        { error: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
