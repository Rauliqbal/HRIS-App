import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'employees' })
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', length: 150 })
  fullName: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: 'date' })
  hireDate: Date;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'terminated'],
    default: 'active',
  })
  status: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
