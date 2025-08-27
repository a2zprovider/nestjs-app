import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('admin')
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  @Roles('admin', 'user')
  findAll(
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.userService.findAll({
      search,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @Roles('admin', 'user')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() data: CreateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
