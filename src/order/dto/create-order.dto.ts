import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateOrderClientDto } from 'src/orderClient/dto/create-orderclient.dto';

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

  @IsOptional()
  category: string;

  @IsOptional()
  orderDate: Date;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  deadlineDate: Date;

  @IsOptional()
  price: number;

  @IsOptional()
  priceTerms: string;

  @IsOptional()
  termsCondition: string;
  
  @IsOptional()
  source: string;
  
  @IsOptional()
  status: string;

  @IsOptional()
  orderClient: any;
  
  @IsOptional()
  assignedUsers: any;
}
