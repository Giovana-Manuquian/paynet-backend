import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CepService } from '../cep/cep.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cepService: CepService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const endereco = await this.cepService.buscarEnderecoPorCep(registerDto.cep);

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const usuario = {
      nome: registerDto.nome,
      email: registerDto.email,
      password: hashedPassword,
      rua: endereco.rua,
      bairro: endereco.bairro,
      numero: registerDto.numero,
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: registerDto.cep,
    };

    return this.usersService.create(usuario);
  }
}
