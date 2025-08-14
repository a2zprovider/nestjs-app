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
import { OrderAttachmentService } from './orderAttachment.service';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateOrderAttachmentDto } from './dto/create-orderattachment.dto';
import { UpdateOrderAttachmentDto } from './dto/update-orderattachment.dto';

@Controller('orderattachments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrderAttachmentController {
  constructor(private readonly orderAttachmentService: OrderAttachmentService) {}

  @Post()
  @Roles('admin')
  create(@Body() data: CreateOrderAttachmentDto) {
    return this.orderAttachmentService.create(data);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.orderAttachmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.orderAttachmentService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() data: UpdateOrderAttachmentDto) {
    return this.orderAttachmentService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.orderAttachmentService.delete(id);
  }
}
