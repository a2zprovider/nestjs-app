import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderClient } from './entities/orderclient.entity';
import { Order } from 'src/order/entities/order.entity';
import { UpdateOrderClientDto } from './dto/update-orderclient.dto';
import { CreateOrderClientDto } from './dto/create-orderclient.dto';

@Injectable()
export class OrderClientService {
  constructor(
    @InjectRepository(OrderClient)
    private readonly orderClientRepository: Repository<OrderClient>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(data: CreateOrderClientDto) {
    const order = await this.orderRepository.findOne({
      where: { id: data.orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${data.orderId} not found`);
    }

    const orderclient = this.orderClientRepository.create({ ...data, order });
    return await this.orderClientRepository.save(orderclient);
  }

  async findAll() {
    return await this.orderClientRepository.find({ relations: ['order'] });
  }

  async findOne(id: number) {
    const orderclient = await this.orderClientRepository.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!orderclient) {
      throw new NotFoundException(`OrderClient with ID ${id} not found`);
    }

    return orderclient;
  }

  async update(id: number, data: UpdateOrderClientDto) {
    const orderclient = await this.orderClientRepository.findOne({
      where: { id },
    });

    if (!orderclient) {
      throw new NotFoundException(`OrderClient with ID ${id} not found`);
    }

    if (data.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: data.orderId },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${data.orderId} not found`);
      }

      orderclient.order = order;
    }

    Object.assign(orderclient, data);

    return await this.orderClientRepository.save(orderclient);
  }

  async delete(id: number) {
    const result = await this.orderClientRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`OrderClient with ID ${id} not found`);
    }

    return { message: 'OrderClient deleted successfully' };
  }
}
