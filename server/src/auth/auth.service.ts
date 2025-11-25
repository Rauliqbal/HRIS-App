import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register-auth.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }
  async register(registerDto: RegisterDto):Promise<any> {
    const user = await this.prisma.employees.create({
     data: {
        full_name: registerDto.full_name,
        email: registerDto.email,
        password: registerDto.password
     }
    })

    return {
      user
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
