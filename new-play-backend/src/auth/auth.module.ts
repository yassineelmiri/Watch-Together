import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { AuthGuard } from './auth.guard';


@Module({
  // this MongooseModule give us ability to link between schema and this model auth 
  // so we can use it inside service
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard
  ],
  exports: [
    AuthService,
    AuthGuard
  ],
})
export class AuthModule { }
