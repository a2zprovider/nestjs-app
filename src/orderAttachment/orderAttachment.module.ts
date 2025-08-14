import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderAttachment } from './entities/orderattachment.entity';
import { OrderAttachmentService } from './orderAttachment.service';
import { OrderAttachmentController } from './orderAttachment.controller';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderAttachment, Order])],
  controllers: [OrderAttachmentController],
  providers: [OrderAttachmentService],
})
export class OrderAttachmentModule {}
