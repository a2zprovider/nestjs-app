import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('orders')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles('admin')
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() data: UpdateOrderDto) {
    return this.orderService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
