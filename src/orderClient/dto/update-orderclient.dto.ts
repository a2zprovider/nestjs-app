import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderClientDto } from './create-orderclient.dto';

export class UpdateOrderClientDto extends PartialType(CreateOrderClientDto) {}
