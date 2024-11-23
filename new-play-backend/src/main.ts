import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
   app.enableCors();

   const config = new DocumentBuilder()
     .setTitle('Chat PlayList API')
     .setDescription('Real-time communication platform API')
     .setVersion('1.0')
     .addBearerAuth()
     .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
