import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderChat } from './entities/orderchat.entity';
import { OrderChatController } from './orderChat.controller';
import { Order } from 'src/order/entities/order.entity';
import { OrderChatService } from './orderChat.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderChat, Order])],
  controllers: [OrderChatController],
  providers: [OrderChatService],
})
export class OrderChatModule {}
