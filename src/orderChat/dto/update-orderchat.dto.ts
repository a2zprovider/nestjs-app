import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderChatDto } from './create-orderchat.dto';

export class UpdateOrderChatDto extends PartialType(CreateOrderChatDto) {}
