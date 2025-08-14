import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLabel } from './entities/orderlabel.entity';
import { OrderLabelService } from './orderLabel.service';
import { OrderLabelController } from './orderLabel.controller';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderLabel, Order])],
  controllers: [OrderLabelController],
  providers: [OrderLabelService],
})
export class OrderLabelModule {}
