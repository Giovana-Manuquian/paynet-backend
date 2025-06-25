import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CepService } from '../cep/cep.service';
import { RegisterDto } from './dto/register.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cepService: CepService,
    private emailService: EmailService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    try {
      const payload = { email: user.email, sub: user._id || user.id };
      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        user: {
          id: user._id || user.id,
          email: user.email,
          fullName: user.nome,
          createdAt: user.createdAt,
        },
      };
    } catch (err) {
      throw new UnauthorizedException('Erro ao gerar token');
    }
  }

  async register(registerDto: RegisterDto) {
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

  // Envia email com link para resetar senha
  async sendResetPasswordEmail(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return {
        message:
          'Se o email estiver cadastrado, você receberá instruções para resetar a senha.',
      };
    }

    const payload = { email: user.email, sub: (user as any)._id || (user as any).id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    // ajuste para URL real

    await this.emailService.sendPasswordResetEmail(user.email, resetLink);

    return {
      message:
        'Se o email estiver cadastrado, você receberá instruções para resetar a senha.',
    };
  }

  // Verifica se o token JWT do reset é válido
  async verifyResetToken(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      return true;
    } catch {
      return false;
    }
  }

  // Atualiza a senha do usuário dado o token JWT e a nova senha
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    try {
      const payload = this.jwtService.verify(token);
      if (!payload.sub) {
        throw new BadRequestException('Token inválido');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await this.usersService.updatePassword(payload.sub, hashedPassword);

      return { message: 'Senha atualizada com sucesso' };
    } catch (err) {
      throw new BadRequestException('Token inválido ou expirado');
    }
  }
}
