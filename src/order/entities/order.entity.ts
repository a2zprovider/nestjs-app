import { OrderLabel } from 'src/orderLabel/entities/orderlabel.entity';
import { OrderAttachment } from 'src/orderAttachment/entities/orderattachment.entity';
import { OrderClient } from 'src/orderClient/entities/orderclient.entity';
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
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { OrderChat } from 'src/orderChat/entities/orderchat.entity';

let status = [
  'New Lead', // Lead is newly captured and uncontacted.
  'Contacted', // First call or message made to the lead.
  'Follow-Up', // Scheduled – A follow-up interaction is planned.
  'Qualified', // Lead has shown interest and fits your target profile.
  'Unqualified', // Lead is not a fit or not interested.
  'Needs Assessment', // Understanding customer requirements.
  'Quotation Sent', // Proposal or quote has been shared.
  'Negotiation in Progress', // Pricing, terms, or scope are being discussed.
  'Deal Won', // Customer confirmed the order or signed agreement
  'Deal Lost', // Lead dropped off or chose a competitor.

  'Order Received', // Order has been officially placed.
  'Payment Pending', // Awaiting payment from customer.
  'Payment Received', // Full or partial payment received.
  'Order Processing', // Order is being prepared internally.
  'Product Ready', // Product is ready for dispatch or installation.
  'Dispatched / In Transit', // Product has been shipped or sent out.
  'Out for Delivery', // Product is with delivery agent, nearing destination.
  'Delivered', // Customer has received the product.
  'Installation Scheduled', // (if applicable) // For products requiring setup.
  'Installation Completed', // Setup or installation finished.

  'Feedback Requested', // Customer feedback or review requested.
  'Support Opened', // Post-delivery issue or query raised.
  'Support Resolved', // All issues handled and customer satisfied.
  'Lead Closed', // Process fully completed.
];

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.orders)
  @JoinTable()
  assignedUsers: User[];

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  category: string;

  @Column({ unique: true })
  pId: number;

  @Column()
  financialYear: string;

  @Column({ default: 'New Lead' })
  status: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  deadlineDate: Date;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  priceTerms: string;

  @Column({ nullable: true })
  termsCondition: string;

  @Column({ nullable: true })
  source: string;

  @OneToMany(() => OrderLabel, (orderLabel) => orderLabel.order)
  orderLabels: OrderLabel[];

  @OneToMany(() => OrderAttachment, (orderAttachment) => orderAttachment.order)
  orderAttachments: OrderAttachment[];

  @OneToOne(() => OrderClient, (orderClient) => orderClient.order, {
    cascade: true,
  })
  @JoinColumn()
  orderClient: OrderClient;

  @OneToMany(() => OrderChat, (orderChat) => orderChat.order)
  orderChats: OrderChat[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
