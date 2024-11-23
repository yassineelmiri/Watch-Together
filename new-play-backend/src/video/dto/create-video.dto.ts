import { IsString, IsOptional } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @IsOptional() 
  name: string;

  @IsOptional() 
  file: string;

  @IsString()
  @IsOptional() 
  userId: string;
}
