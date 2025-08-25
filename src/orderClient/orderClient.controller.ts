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
import { OrderClientService } from './orderClient.service';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateOrderClientDto } from './dto/create-orderclient.dto';
import { UpdateOrderClientDto } from './dto/update-orderclient.dto';

@Controller('orderclients')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrderClientController {
  constructor(private readonly orderClientService: OrderClientService) {}

  @Post()
  @Roles('admin')
  create(@Body() data: CreateOrderClientDto) {
    return this.orderClientService.create(data);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.orderClientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.orderClientService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() data: UpdateOrderClientDto) {
    return this.orderClientService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.orderClientService.delete(id);
  }
}
