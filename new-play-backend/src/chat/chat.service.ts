// src/chat/chat.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './schemas/chat.schema'; // Importez bien le modèle Chat
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private chatModel: Model<Chat>) {} // Utilisez 'Chat' comme nom

  async create(createChatDto: CreateChatDto) {
    const newChat = new this.chatModel(createChatDto);
    return newChat.save();
  }

  async findAll() {
    return this.chatModel.find().exec();
  }

  async findOne(id: string) {
    return this.chatModel.findById(id).exec();
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    return this.chatModel.findByIdAndUpdate(id, updateChatDto, { new: true });
  }

  async remove(id: string) {
    return this.chatModel.findByIdAndDelete(id).exec();
  }
}
