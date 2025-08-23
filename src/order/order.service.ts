import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(data: CreateOrderDto, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const latestOrder = await this.orderRepository.findOne({
      where: {},
      order: { pId: 'DESC' },
    });

    let nextPId = (Number(latestOrder?.pId) || 0) + 1;

    // Calculate financial year
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0 = Jan, 3 = April
    const financialYear =
      currentMonth >= 3
        ? `${currentYear}-${currentYear + 1}`
        : `${currentYear - 1}-${currentYear}`;

    const order = this.orderRepository.create({
      ...data,
      user,
      pId: nextPId,
      financialYear,
    });

    return {
      message: 'Order created successfully',
      data: await this.orderRepository.save(order),
    };
  }

  async findAll({ search }: { search?: string }) {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderLabels', 'orderLabels')
      .leftJoinAndSelect('order.orderAttachments', 'orderAttachments')
      .leftJoinAndSelect('order.orderChats', 'orderChats');

    if (search) {
      query.andWhere(
        `(order.title ILIKE :search OR 
        CAST(order.pId AS TEXT) ILIKE :search OR 
        order.financialYear ILIKE :search OR 
        order.status ILIKE :search OR 
        order.description ILIKE :search)`,
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
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

  async update(orderId: number, data: UpdateOrderDto, userId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    if (order.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this order');
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
