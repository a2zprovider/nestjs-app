import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsNotEmpty,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'Password too weak. It should contain at least one uppercase letter, one number, and one special character.',
  })
  @IsNotEmpty()
  readonly password: string;
  
  @IsOptional()
  @IsString()
  whatsapp: string;
  
  @IsOptional()
  @IsString()
  mobile: string;

  @IsOptional()
  @IsIn(['user', 'admin'], {
    message: 'Role must be either "user" or "admin".',
  })
  readonly role?: string;
}
