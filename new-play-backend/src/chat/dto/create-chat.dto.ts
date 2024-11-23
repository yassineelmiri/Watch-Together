import { IsString, IsObject } from 'class-validator';

export class CreateChatDto {
  @IsString()
  event: string;

  @IsObject()
  data: {
    userId: string;
    message: string;
  };
}
