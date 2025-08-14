import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderChatDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
