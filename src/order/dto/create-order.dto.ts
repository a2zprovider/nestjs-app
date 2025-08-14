import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  pId: number;

  @IsNotEmpty()
  @IsString()
  financialYear: string;
}
