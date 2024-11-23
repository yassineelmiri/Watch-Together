import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { StatusUser } from './enums/user.enum';

export interface AuthenticatedSocket extends Socket {
    user?: UserDocument;
}

export const createSocketMiddleware = (jwtService: JwtService, userModel: Model<User>) => {
    return async (socket: AuthenticatedSocket, next) => {
        try {
            const token = socket.handshake.auth.token?.replace('Bearer ', '') ||
                socket.handshake.headers.authorization?.replace('Bearer ', '');

            if (!token) {
                return next(new Error('Authentication error'));
            }

            const payload = await jwtService.verifyAsync(token);
            const user = await userModel
                .findById(payload.id)
                .select('-password')
                .exec();

            if (!user || user.status === StatusUser.BANNED) {
                return next(new Error('User not found or banned'));
            }

            socket.user = user;
            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    };
};