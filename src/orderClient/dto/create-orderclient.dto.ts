import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateOrderClientDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  whatsapp: string;

  @IsOptional()
  @IsString()
  mobile: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  gstNumber: string;
}
