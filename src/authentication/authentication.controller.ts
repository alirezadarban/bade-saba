import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';


@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  async findOne(@Body('username') username: string,
                @Body('password') password: string,
                @Res() res: Response) {
    let result = await this.authenticationService.findOne(username.toLowerCase(), password);
    return res.status(result.status).send(result);
  }
}
