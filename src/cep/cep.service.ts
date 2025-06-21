import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CepService {
  constructor(private readonly httpService: HttpService) {}

  async buscarEnderecoPorCep(cep: string): Promise<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
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
    } catch (error) {
      throw new Error('Erro ao buscar o CEP');
    }
  }
}
