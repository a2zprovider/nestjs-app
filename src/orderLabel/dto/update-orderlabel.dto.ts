import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderLabelDto } from './create-orderlabel.dto';

export class UpdateOrderLabelDto extends PartialType(CreateOrderLabelDto) {}
