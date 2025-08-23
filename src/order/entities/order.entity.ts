import { OrderLabel } from 'src/orderLabel/entities/orderlabel.entity';
import { OrderAttachment } from 'src/orderAttachment/entities/orderattachment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderChat } from 'src/orderChat/entities/orderchat.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  title: string;

  @Column({ unique: true })
  pId: number;

  @Column()
  financialYear: string;

  @Column({ default: '' })
  status: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => OrderLabel, (orderLabel) => orderLabel.order)
  orderLabels: OrderLabel[];

  @OneToMany(() => OrderAttachment, (orderAttachment) => orderAttachment.order)
  orderAttachments: OrderAttachment[];
  
  @OneToMany(() => OrderChat, (orderChat) => orderChat.order)
  orderChats: OrderChat[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
