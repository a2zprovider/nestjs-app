import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderAttachmentDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  link: string;
}
