import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { StatusUser } from 'src/common/enums/user.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      // Validate user exists in database
      const user = await this.userModel.findById(payload.id)
        .select('-password') // Here i Exclude password from the returned user object
        .exec();



      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Check if user is active/banned if you have such fields
      if (user.status === StatusUser.BANNED) {
        throw new UnauthorizedException('User is banned');
      }

      // Add user info to request so u can access it from controller and services
      request.user = user;
      request.userId = user._id;
      request.role = payload.role;

      return true;
    } catch (error) {
      Logger.error(`Authentication error: ${error.message}`);

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    return authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : undefined;
  }
}