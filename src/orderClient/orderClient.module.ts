import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderClient } from './entities/orderclient.entity';
import { OrderClientService } from './orderClient.service';
import { OrderClientController } from './orderClient.controller';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderClient, Order])],
  controllers: [OrderClientController],
  providers: [OrderClientService],
})
export class OrderClientModule {}
