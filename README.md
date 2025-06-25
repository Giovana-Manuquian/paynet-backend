<p align="center">
  Um framework progressivo em <a href="http://nodejs.org" target="_blank">Node.js</a> para construir aplicações backend eficientes e escaláveis.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="Versão NPM" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Licença" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="Downloads NPM" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Seguir" alt="Siga no Twitter"></a>
</p>

---

## Descrição do Projeto

Este projeto foi desenvolvido como tarefa para um processo seletivo de Node.js, utilizando o framework NestJS para criar uma API backend com autenticação via JWT.

### Funcionalidades principais

- **Página de Cadastro:**
  - Campos: nome completo, e-mail, senha, confirmar senha e endereço (Rua, Bairro, Número, Cidade, Estado, CEP).
  - Validação do CEP com integração a API externa para busca automática dos dados do endereço.
- **Página de Login:**
  - Campos: e-mail e senha.
- **Página de Recuperação de Senha:**
  - Campo: e-mail para envio de link ou código de recuperação.
- **Página Home:**
  - Listagem de todos os usuários cadastrados no sistema.

### Comunicação Frontend-Backend

- Comunicação via AJAX.
- Autenticação via tokens JWT.

### Arquitetura e Tecnologias

- Segue os princípios de design SOLID.
- Utiliza **services**, **models** e **controllers** para organização do código.
- Implementa um **provider** para integração com API de busca de endereço via CEP.
- Banco de dados MongoDB para persistência dos dados.

---

## Pré-requisitos

- Node.js versão 18 ou superior
- npm (gerenciador de pacotes)
- MongoDB configurado e rodando localmente ou remotamente

---

## Instalação

Clone o repositório e instale as dependências:

bash
git clone https://github.com/Giovana-Manuquian/paynet-backend.git
cd paynet-backend
npm install
Configuração
Configure as variáveis de ambiente necessárias, criando um arquivo .env na raiz do projeto:

env
Copiar
Editar
MONGODB_URI=mongodb://localhost:27017/paynet
JWT_SECRET=seusegredoaqui
PORT=3000
Altere conforme sua configuração.

Execução
Para rodar o backend em modo desenvolvimento com reload automático:

bash
Copiar
Editar
npm run start:dev
Para rodar em modo normal (produção ou desenvolvimento):

bash
Copiar
Editar
npm run start
Para rodar em modo produção:

bash
Copiar
Editar
npm run start:prod
Testes
Rodar testes unitários:

bash
Copiar
Editar
npm run test
Rodar testes end-to-end:

bash
Copiar
Editar
npm run test:e2e
Gerar relatório de cobertura de testes:

bash
Copiar
Editar
npm run test:cov
Deploy
Para deploy em produção, consulte a documentação oficial do NestJS:

Deploy NestJS

Também pode usar a plataforma oficial de deploy NestJS (AWS):

bash
Copiar
Editar
npm install -g @nestjs/mau
mau deploy
