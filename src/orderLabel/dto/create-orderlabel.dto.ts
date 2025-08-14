import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderLabelDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}
