// src/room/room.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}
  
  async create(createRoomDto: CreateRoomDto) {
    const createdRoom = new this.roomModel({
      ...createRoomDto,
      createdAt: new Date(), 
    });
    return await createdRoom.save();
  }

  async findAll() {
    return this.roomModel.find().exec();
  }

  async findOne(id: Types.ObjectId) {
    return this.roomModel.findById(id).exec();
  }

  async update(id: Types.ObjectId, updateRoomDto: UpdateRoomDto) {
    return this.roomModel.findByIdAndUpdate(id, updateRoomDto, { new: true }).exec();
  }

  async remove(id: Types.ObjectId) {
    return this.roomModel.findByIdAndDelete(id).exec();
  }
}
