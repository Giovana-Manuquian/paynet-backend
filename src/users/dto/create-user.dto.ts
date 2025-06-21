import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  rua: string;

  @IsNotEmpty()
  bairro: string;

  @IsNotEmpty()
  numero: string;

  @IsNotEmpty()
  cidade: string;

  @IsNotEmpty()
  estado: string;

  @IsNotEmpty()
  cep: string;
}
