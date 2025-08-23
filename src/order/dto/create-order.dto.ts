import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  // @IsNotEmpty()
  // @IsNumber()
  // userId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  // @IsNotEmpty()
  // @IsNumber()
  // pId: number;

  // @IsNotEmpty()
  // @IsString()
  // financialYear: string;

  @IsOptional()
  description: string;
}
