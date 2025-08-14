import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateOrderDto) {
    const user = await this.userRepository.findOne({
      where: { id: data.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${data.userId} not found`);
    }

    const order = this.orderRepository.create({ ...data, user });
    return await this.orderRepository.save(order);
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['user', 'orderLabels', 'orderAttachments', 'orderChats'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderLabels', 'orderAttachments', 'orderChats'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(id: number, data: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (data.userId) {
      const user = await this.userRepository.findOne({
        where: { id: data.userId },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${data.userId} not found`);
      }

      order.user = user;
    }

    Object.assign(order, data);

    return await this.orderRepository.save(order);
  }

  async delete(id: number) {
    const result = await this.orderRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return { message: 'Order deleted successfully' };
  }
}
