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
  @Roles('admin', 'user')
  create(@Body() data: CreateOrderDto, @User('id') userId: number) {
    return this.orderService.create(data, userId);
  }

  @Get()
  @Roles('admin', 'user')
  findAll(
    @User('id') userId: number,
    @Query('search') search?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.orderService.findAll({ search, startDate, endDate, userId });
  }

  @Get(':id')
  @Roles('admin', 'user')
  async findOne(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'user') // or remove this if users can update their own orders
  update(
    @Param('id') id: number,
    @Body() data: UpdateOrderDto,
    @User('id') userId: number,
  ) {
    return this.orderService.update(id, data, userId);
  }

  @Delete(':id')
  @Roles('admin', 'user')
  async delete(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
