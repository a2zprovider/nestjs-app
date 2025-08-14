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
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateOrderChatDto } from './dto/create-orderchat.dto';
import { UpdateOrderChatDto } from './dto/update-orderchat.dto';
import { OrderChatService } from './orderChat.service';

@Controller('orderchats')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrderChatController {
  constructor(private readonly orderChatService: OrderChatService) {}

  @Post()
  @Roles('admin')
  create(@Body() data: CreateOrderChatDto) {
    return this.orderChatService.create(data);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.orderChatService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.orderChatService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() data: UpdateOrderChatDto) {
    return this.orderChatService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.orderChatService.delete(id);
  }
}
