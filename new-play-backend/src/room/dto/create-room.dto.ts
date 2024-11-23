// src/room/dto/create-room.dto.ts
import {  IsString, 
  IsInt, 
  IsArray, 
  ArrayNotEmpty, 
  IsDate, 
  IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  title: string;

  @IsInt()
  numberOfPlaces: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  Users: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  Videos: string[]; 


  @IsOptional() 
  @IsDate()
  createdAt?: Date; 
}
