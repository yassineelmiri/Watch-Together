import {
  Controller,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  // POST register
  @Post('signup')
  async signup(@Body() signupData: SignupDto) {

    console.log(signupData)
    try {
      return this.authService.signup(signupData);
    } catch (error) {

      throw new BadRequestException('Failed to Signup');
    }
  }




  // POST LOGIN
  @Post('login')
  async login(@Body() loginData: LoginDto) {

    try {
      return this.authService.login(loginData);
    } catch (error) {

      throw new BadRequestException('Failed to Login');
    }
  }


}