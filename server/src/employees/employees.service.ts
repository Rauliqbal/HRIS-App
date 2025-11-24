import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import argon from 'argon2';
import { Employees } from './entities/employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private repo: Repository<Employees>,
  ) {}

  async create(email: string, password: string) {
    const hashed = await argon.hash(password);

    const user = this.repo.create({ email, password: hashed });

    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
}
