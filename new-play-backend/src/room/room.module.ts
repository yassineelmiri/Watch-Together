// src/room/room.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from './schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]), // Déclaration du modèle Room
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService], // Exportation du service si nécessaire dans d'autres modules
})
export class RoomModule {}
