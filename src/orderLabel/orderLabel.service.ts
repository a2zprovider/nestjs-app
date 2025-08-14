import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderLabel } from './entities/orderlabel.entity';
import { Order } from 'src/order/entities/order.entity';
import { UpdateOrderLabelDto } from './dto/update-orderlabel.dto';
import { CreateOrderLabelDto } from './dto/create-orderlabel.dto';

@Injectable()
export class OrderLabelService {
  constructor(
    @InjectRepository(OrderLabel)
    private readonly orderLabelRepository: Repository<OrderLabel>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(data: CreateOrderLabelDto) {
    const order = await this.orderRepository.findOne({
      where: { id: data.orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${data.orderId} not found`);
    }

    const orderlabel = this.orderLabelRepository.create({ ...data, order });
    return await this.orderLabelRepository.save(orderlabel);
  }

  async findAll() {
    return await this.orderLabelRepository.find({ relations: ['order'] });
  }

  async findOne(id: number) {
    const orderlabel = await this.orderLabelRepository.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!orderlabel) {
      throw new NotFoundException(`OrderLabel with ID ${id} not found`);
    }

    return orderlabel;
  }

  async update(id: number, data: UpdateOrderLabelDto) {
    const orderlabel = await this.orderLabelRepository.findOne({
      where: { id },
    });

    if (!orderlabel) {
      throw new NotFoundException(`OrderLabel with ID ${id} not found`);
    }

    if (data.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: data.orderId },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${data.orderId} not found`);
      }

      orderlabel.order = order;
    }

    Object.assign(orderlabel, data);

    return await this.orderLabelRepository.save(orderlabel);
  }

  async delete(id: number) {
    const result = await this.orderLabelRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`OrderLabel with ID ${id} not found`);
    }

    return { message: 'OrderLabel deleted successfully' };
  }
}
