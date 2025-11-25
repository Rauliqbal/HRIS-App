
import { IsString } from 'class-validator';

export class RegisterDto {

  @IsString()
  full_name: string

  @IsString()
  email:string

  @IsString()
  password:string
  
  @IsString()
  phone:string

  @IsString()
  status:string
}