import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class OrderAttachment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderAttachments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: Order;

  @ManyToOne(() => User, (user) => user.orderAttachments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  file: string;

  @Column({ nullable: true })
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
