import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderChatDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsOptional()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
