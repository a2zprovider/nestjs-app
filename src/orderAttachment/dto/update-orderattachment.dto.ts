import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderAttachmentDto } from './create-orderattachment.dto';

export class UpdateOrderAttachmentDto extends PartialType(CreateOrderAttachmentDto) {}
