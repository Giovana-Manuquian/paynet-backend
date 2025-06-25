# Paynet Backend

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

## Instalação, Configuração, Execução, Testes e Deploy

```bash
git clone https://github.com/Giovana-Manuquian/paynet-backend.git
cd paynet-backend
npm install

# Crie o arquivo .env com o conteúdo abaixo:
echo "MONGODB_URI=mongodb://localhost:27017/paynet" >> .env
echo "JWT_SECRET=seusegredoaqui" >> .env
echo "PORT=3000" >> .env

# Para rodar o backend em modo desenvolvimento com reload automático:
npm run start:dev

# Para rodar em modo normal (produção ou desenvolvimento):
npm run start

# Para rodar em modo produção:
npm run start:prod

# Rodar testes unitários:
npm run test

# Rodar testes end-to-end:
npm run test:e2e

# Gerar relatório de cobertura de testes:
npm run test:cov

# Deploy - para deploy em produção, consulte a documentação oficial do NestJS:
# https://docs.nestjs.com/cli/monorepo#deployment

# Também pode usar a plataforma oficial de deploy NestJS (AWS):
npm install -g @nestjs/mau
mau deploy
