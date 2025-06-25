import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
    await this.transporter.sendMail({
      from: `"PayAuth" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Redefinição de Senha',
      html: `
        <p>Você solicitou uma redefinição de senha.</p>
        <p><a href="${resetLink}">Clique aqui para redefinir sua senha</a></p>
        <p>Esse link é válido por 1 hora.</p>
      `,
    });
  }
}
