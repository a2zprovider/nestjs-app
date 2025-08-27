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
import { User } from 'src/common/decorators/user.decorator';

@Controller('orderattachments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrderAttachmentController {
  constructor(
    private readonly orderAttachmentService: OrderAttachmentService,
  ) {}

  @Post()
  @Roles('admin', 'user')
  create(@Body() data: CreateOrderAttachmentDto, @User('id') userId: number) {
    return this.orderAttachmentService.create(data, userId);
  }

  @Get()
  @Roles('admin', 'user')
  findAll() {
    return this.orderAttachmentService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  async findOne(@Param('id') id: number) {
    return this.orderAttachmentService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'user')
  update(
    @Param('id') id: number,
    @Body() data: UpdateOrderAttachmentDto,
    @User('id') userId: number,
  ) {
    return this.orderAttachmentService.update(id, data, userId);
  }

  @Delete(':id')
  @Roles('admin', 'user')
  async delete(@Param('id') id: number) {
    return this.orderAttachmentService.delete(id);
  }
}
