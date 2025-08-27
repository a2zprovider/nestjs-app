import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderAttachment } from './entities/orderattachment.entity';
import { OrderAttachmentService } from './orderAttachment.service';
import { OrderAttachmentController } from './orderAttachment.controller';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderAttachment, Order, User])],
  controllers: [OrderAttachmentController],
  providers: [OrderAttachmentService],
})
export class OrderAttachmentModule {}
