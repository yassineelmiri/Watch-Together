import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Types } from 'mongoose'; // Import de Types pour utiliser ObjectId

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // Route pour créer une chambre
  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  // Route pour récupérer toutes les chambres
  @Get()
  async findAll() {
    return this.roomService.findAll();
  }

  // Route pour récupérer une chambre par son ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const objectId = new Types.ObjectId(id); // Transformation de l'ID en ObjectId
    return this.roomService.findOne(objectId);
  }

  // Route pour mettre à jour une chambre par son ID
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    const objectId = new Types.ObjectId(id); // Transformation de l'ID en ObjectId
    return this.roomService.update(objectId, updateRoomDto);
  }

  // Route pour supprimer une chambre par son ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const objectId = new Types.ObjectId(id); // Transformation de l'ID en ObjectId
    return this.roomService.remove(objectId);
  }
}
