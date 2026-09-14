import swaggerJSDoc from 'swagger-jsdoc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const docsDirectory = path.resolve(currentDirectory, '../../docs');

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'EcoWeb API',
    version: '1.0.0',
    description: `
API REST da plataforma EcoWeb, que conecta instituições fornecedoras de materiais
reutilizáveis a pessoas interessadas em projetos sustentáveis.

### Autenticação

Com exceção de \`GET /\`, \`POST /auth/login\` e \`POST /auth/register\`, todas as
operações exigem um JWT no cabeçalho \`Authorization\`, no formato
\`Bearer <token>\`. O mesmo token identifica usuários e instituições; cada operação
explica qual tipo de conta é esperado pela regra de negócio.

### Formato dos dados

- Corpos de requisição e resposta usam \`application/json\`.
- Identificadores são \`ObjectId\` do MongoDB, com 24 caracteres hexadecimais.
- Datas são serializadas em ISO 8601 e UTC.
- Operações que retornam sucesso sem conteúdo possuem corpo vazio.

### Erros

Erros das regras de negócio usam, em geral, \`{ "message": "..." }\`. Falhas de
autenticação produzidas pelo middleware usam \`{ "error": "..." }\`.
    `.trim(),
    contact: {
      name: 'Ruan',
      email: 'ruanoliveiradev@gmail.com',
    },
    license: {
      name: 'ISC',
    },
    'x-logo': {
      url: '/public/logo.jpg',
      backgroundColor: '#FFFFFF',
      altText: 'Logo EcoWeb'
    },
  },
  servers: [
    {
      url: '/',
      description: 'Servidor que hospeda esta documentação',
    },
  ],
  tags: [
    { name: 'Sistema', description: 'Disponibilidade e conteúdo inicial da API.' },
    { name: 'Autenticação', description: 'Cadastro e autenticação de usuários e instituições.' },
    { name: 'Projetos', description: 'Projetos sustentáveis publicados por usuários.' },
    { name: 'Materiais', description: 'Materiais reutilizáveis disponibilizados por instituições.' },
    { name: 'Favoritos', description: 'Projetos e materiais favoritados pelo usuário autenticado.' },
    { name: 'Usuários', description: 'Perfil e indicadores da conta de usuário.' },
    { name: 'Instituições', description: 'Perfis públicos e autenticados de instituições.' },
    { name: 'Busca', description: 'Busca textual simultânea em projetos e materiais.' },
    { name: 'Feedbacks', description: 'Registro da conclusão de uma doação de material.' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT retornado por `POST /auth/login`.',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  failOnErrors: true,
  apis: [
    path.join(docsDirectory, 'routes/*.yaml'),
    path.join(docsDirectory, 'components/*.yaml'),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
