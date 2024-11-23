import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { configuration } from 'config/app.config';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VideoModule } from './video/video.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Cela crée un préfixe '/uploads' pour vos fichiers
    }),
    // Config Module setup with both configurations
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),

    // MongoDB connection using the database config
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),  // Assurez-vous que la clé 'database.url' existe dans votre configuration
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),

    // JWT setup using the JWT config
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),  // Assurez-vous que la clé 'jwt.secret' existe dans votre configuration
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),  // Assurez-vous que la clé 'jwt.expiresIn' existe dans votre configuration
        },
      }),
      global: true,
      inject: [ConfigService],
    }),

    // Modules
    ChatModule,
    UserModule,
    AuthModule, 
    RoomModule, 
    UserModule, 
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
