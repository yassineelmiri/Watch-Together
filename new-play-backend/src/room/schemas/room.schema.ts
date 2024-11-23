// src/room/schemas/room.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Room extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  numberOfPlaces: number;

  @Prop({ type: [String], default: [] }) // Définir comme un tableau de chaînes
  Videos: string[];

  @Prop({ type: [String], default: [] }) // Définir comme un tableau de chaînes
  Users: string[];

  @Prop({ default: Date.now }) // Définit la date par défaut
  createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
