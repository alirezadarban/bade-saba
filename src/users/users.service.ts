import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import globalValues from '../globalValues';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    try {
      createUserDto.id = ++globalValues.lastId;
      globalValues.users.push(createUserDto)
      return globalValues.response(
        true,
        'user added successfully!',
        {},
        '',
        HttpStatus.OK);
    } catch (e) {
      return globalValues.response(
        false,
        e.message,
        {},
        e.stack,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    try {
        return globalValues.response(
          true,
          'users!',
          globalValues.users,
          '',
          HttpStatus.OK);
    } catch (e) {
      return globalValues.response(
        false,
        e.message,
        {},
        e.stack,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    try {
      return globalValues.response(
        true,
        'users!',
        globalValues.users.find(elm => elm.id === id),
        '',
        HttpStatus.OK);
    } catch (e) {
      return globalValues.response(
        false,
        e.message,
        {},
        e.stack,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      let index = globalValues.users.findIndex(elm => elm.id === id);
      globalValues.users[index].fullname = updateUserDto.fullname;
      globalValues.users[index].password = updateUserDto.password;
      return globalValues.response(
        true,
        'user updated successfully!',
        {},
        '',
        HttpStatus.OK);
    } catch (e) {
      return globalValues.response(
        false,
        e.message,
        {},
        e.stack,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    try {
      let index = globalValues.users.findIndex(elm => elm.id === id);
      globalValues.users.splice(index, 1);
      return globalValues.response(
        true,
        'user removed successfully!',
        {},
        '',
        HttpStatus.OK);
    } catch (e) {
      return globalValues.response(
        false,
        e.message,
        {},
        e.stack,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
