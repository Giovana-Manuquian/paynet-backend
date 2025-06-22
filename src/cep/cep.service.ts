import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CepService {
  constructor(private readonly httpService: HttpService) { }

  private validarCep(cep: string): boolean {
    return /^[0-9]{8}$/.test(cep);
  }

  async buscarEnderecoPorCep(cep: string): Promise<any> {
    if (!cep || typeof cep !== 'string') {
      throw new Error('CEP inválido ou não informado');
    }

    // Limpa o CEP
    const cepLimpo = cep.replace(/\D/g, '');

    // Valida formato
    if (!this.validarCep(cepLimpo)) {
      throw new Error('Formato de CEP inválido');
    }

    const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      if (response.data.erro) {
        throw new Error('CEP não encontrado');
      }

      return {
        rua: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        estado: response.data.uf,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao buscar o CEP:', error.message);
        throw new Error(error.message);
      }
      console.error('Erro desconhecido ao buscar o CEP:', error);
      throw new Error('Erro ao buscar o CEP');
    }
  }
}
