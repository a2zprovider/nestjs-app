import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderAttachment } from './entities/orderattachment.entity';
import { Order } from 'src/order/entities/order.entity';
import { UpdateOrderAttachmentDto } from './dto/update-orderattachment.dto';
import { CreateOrderAttachmentDto } from './dto/create-orderattachment.dto';

@Injectable()
export class OrderAttachmentService {
  constructor(
    @InjectRepository(OrderAttachment)
    private readonly orderAttachmentRepository: Repository<OrderAttachment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(data: CreateOrderAttachmentDto) {
    const order = await this.orderRepository.findOne({
      where: { id: data.orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${data.orderId} not found`);
    }

    const orderattachment = this.orderAttachmentRepository.create({ ...data, order });
    return await this.orderAttachmentRepository.save(orderattachment);
  }

  async findAll() {
    return await this.orderAttachmentRepository.find({ relations: ['order'] });
  }

  async findOne(id: number) {
    const orderattachment = await this.orderAttachmentRepository.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!orderattachment) {
      throw new NotFoundException(`OrderAttachment with ID ${id} not found`);
    }

    return orderattachment;
  }

  async update(id: number, data: UpdateOrderAttachmentDto) {
    const orderattachment = await this.orderAttachmentRepository.findOne({
      where: { id },
    });

    if (!orderattachment) {
      throw new NotFoundException(`OrderAttachment with ID ${id} not found`);
    }

    if (data.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: data.orderId },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${data.orderId} not found`);
      }

      orderattachment.order = order;
    }

    Object.assign(orderattachment, data);

    return await this.orderAttachmentRepository.save(orderattachment);
  }

  async delete(id: number) {
    const result = await this.orderAttachmentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`OrderAttachment with ID ${id} not found`);
    }

    return { message: 'OrderAttachment deleted successfully' };
  }
}
