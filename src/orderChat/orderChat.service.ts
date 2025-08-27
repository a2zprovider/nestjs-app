import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderChat } from './entities/orderchat.entity';
import { Order } from 'src/order/entities/order.entity';
import { UpdateOrderChatDto } from './dto/update-orderchat.dto';
import { CreateOrderChatDto } from './dto/create-orderchat.dto';

@Injectable()
export class OrderChatService {
  constructor(
    @InjectRepository(OrderChat)
    private readonly orderChatRepository: Repository<OrderChat>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(data: CreateOrderChatDto) {
    const order = await this.orderRepository.findOne({
      where: { id: data.orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${data.orderId} not found`);
    }

    const orderchat = this.orderChatRepository.create({ ...data, order });
    return {
      message: 'Order chat created successfully',
      data: await this.orderChatRepository.save(orderchat),
    };
  }

  async findAll() {
    return await this.orderChatRepository.find({ relations: ['order'] });
  }

  async findOne(id: number) {
    const orderchat = await this.orderChatRepository.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!orderchat) {
      throw new NotFoundException(`OrderChat with ID ${id} not found`);
    }

    return orderchat;
  }

  async update(id: number, data: UpdateOrderChatDto) {
    const orderchat = await this.orderChatRepository.findOne({
      where: { id },
    });

    if (!orderchat) {
      throw new NotFoundException(`OrderChat with ID ${id} not found`);
    }

    if (data.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: data.orderId },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${data.orderId} not found`);
      }

      orderchat.order = order;
    }

    Object.assign(orderchat, data);

    return {
      message: 'Order chat updated successfully',
      data: await this.orderChatRepository.save(orderchat),
    };
  }

  async delete(id: number) {
    const result = await this.orderChatRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`OrderChat with ID ${id} not found`);
    }

    return { message: 'Order chat deleted successfully' };
  }
}
