import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
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
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log('Usuário encontrado no validateUser:', user);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      console.log('User retornado sem senha:', result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    try {
      console.log('User no login:', user);
      const payload = { email: user.email, sub: user._id || user.id };
      console.log('Payload para JWT:', payload);

      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        user: {
          id: user._id || user.id,
          email: user.email,
          fullName: user.nome, // <-- aqui está o ajuste!
          createdAt: user.createdAt,
          // adicione mais campos se quiser
        },
      };
    } catch (err) {
      console.error('Erro ao gerar token JWT:', err);
      throw new UnauthorizedException('Erro ao gerar token');
    }
  }


  async register(registerDto: RegisterDto) {
    console.log('CEP recebido no register:', registerDto.cep);
    let endereco;
    try {
      endereco = await this.cepService.buscarEnderecoPorCep(registerDto.cep);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro desconhecido ao buscar o CEP');
    }

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
