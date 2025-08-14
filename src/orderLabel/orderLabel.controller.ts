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
import { OrderLabelService } from './orderLabel.service';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateOrderLabelDto } from './dto/create-orderlabel.dto';
import { UpdateOrderLabelDto } from './dto/update-orderlabel.dto';

@Controller('orderlabels')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrderLabelController {
  constructor(private readonly orderLabelService: OrderLabelService) {}

  @Post()
  @Roles('admin')
  create(@Body() data: CreateOrderLabelDto) {
    return this.orderLabelService.create(data);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.orderLabelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.orderLabelService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() data: UpdateOrderLabelDto) {
    return this.orderLabelService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.orderLabelService.delete(id);
  }
}
