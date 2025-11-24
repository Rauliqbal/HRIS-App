import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [EmployeesModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
