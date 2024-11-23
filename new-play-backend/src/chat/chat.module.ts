// src/chat/chat.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from './schemas/chat.schema'; // Assurez-vous que Chat est bien importé

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]), // Utilisez 'Chat' comme nom, pas `Chat.name`
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService], 
})
export class ChatModule {}
