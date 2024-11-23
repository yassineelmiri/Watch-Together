import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // here we call  schema <model user>
    private jwtService: JwtService, // this give us ability to create token for users
  ) { }

  // SignupDto it's like a validator  validate data we pass to it
  async signup(signupData: SignupDto) {

    const { email, password, username, role = 'user' } = signupData;

    // check if email is existing
    const emailIsExisting = await this.userModel.findOne({ email });

    if (emailIsExisting) {
      throw new BadRequestException('Email already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user & save it
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      role,
      isOnline: true,
    });
    await newUser.save();

    const tokens = await this.generateUserTokens(newUser);
    return {
      ...tokens,
      // user_code: newUser.id,
    };
  }



  // LoginDto it's like a validator  validate data we pass to it
  async login(loginData: LoginDto) {
    const { email, password } = loginData;

    // check if user exists
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    // compare password with existing password
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) { // if password are not same rturn error
      throw new UnauthorizedException('Wrong Credentials');
    }

    // Generate JWT tokens
    const tokens = await this.generateUserTokens(user);
    return {
      ...tokens,
      user: user,
    };
  }


  //this func generate token for  user
  async generateUserTokens(user: UserDocument) {
    // create payload
    const payload = { id: user.id, role: user.role };

    // generate new access token
    const access_token = await this.jwtService.signAsync(payload);

    return {
      token: access_token,
    };
  }
}
