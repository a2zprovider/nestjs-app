import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('orders')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles('admin')
  create(@Body() data: CreateOrderDto, @User('id') userId: number) {
    return this.orderService.create(data, userId);
  }

  @Get()
  @Roles('admin')
  findAll(@Query('search') search?: string) {
    return this.orderService.findAll({ search });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @Roles('admin') // or remove this if users can update their own orders
  update(
    @Param('id') id: number,
    @Body() data: UpdateOrderDto,
    @User('id') userId: number,
  ) {
    return this.orderService.update(id, data, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
