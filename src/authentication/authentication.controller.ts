import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';


@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  async findOne(@Body('username') username: string,
                @Body('password') password: string,
                @Body('dateTime') dateTime: string,
                @Res() res: Response) {
    console.log("dateTime",dateTime)
    let result = await this.authenticationService.findOne(username.toLowerCase(), password);
    return res.status(result.status).send({...result, dateTime});
  }
}
