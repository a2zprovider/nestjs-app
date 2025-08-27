import { Order } from 'src/order/entities/order.entity';
import { OrderAttachment } from 'src/orderAttachment/entities/orderattachment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column()
  password: string;

  @Column({ default: 'user' }) // roles: 'user', 'admin'
  role: string;

  @Column({ default: 'active' }) // status: 'active', 'inactive', 'banned', etc.
  status: string;

  @ManyToMany(() => Order, (order) => order.assignedUsers)
  orders: Order[];

  @OneToMany(() => OrderAttachment, (orderattachment) => orderattachment.user)
  orderAttachments: OrderAttachment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
