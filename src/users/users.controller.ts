import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    let result = await this.usersService.create(createUserDto);
    return res.status(result.status).send(result);
  }

  @Get()
  async findAll(@Res() res: Response) {
    let result = await this.usersService.findAll();
    return res.status(result.status).send(result);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    let result = await this.usersService.update(id, updateUserDto);
    return res.status(result.status).send(result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    let result = await this.usersService.remove(id);
    return res.status(result.status).send(result);
  }
}
