import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { RoleTypes } from "src/common/enums/user.enum";

export class SignupDto {

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string



    @IsEnum(RoleTypes)
    @IsOptional()
    role: RoleTypes
}