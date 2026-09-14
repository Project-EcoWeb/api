# 🌱 EcoWeb API

API REST da EcoWeb, uma plataforma que conecta instituições que possuem materiais
reutilizáveis a pessoas interessadas em projetos criativos e sustentáveis.

O projeto usa Node.js, Express, MongoDB, Mongoose, autenticação JWT e documentação
OpenAPI/Swagger. A stack Docker incluída inicia a API e o banco de dados com um único
comando.

## Início rápido com Docker

### Requisitos

- Docker Engine 24 ou superior
- Docker Compose v2 (`docker compose`)

### 1. Configure o ambiente

Copie o arquivo de exemplo. As credenciais fornecidas são apenas para desenvolvimento:

```bash
cp .env.example .env
```

Se as portas `3333` ou `27017` já estiverem ocupadas, altere `PORT_SERVER` ou
`MONGODB_PORT` no `.env` antes de iniciar a stack.

### 2. Inicie a stack

```bash
docker compose up -d --build
```

O Compose espera o MongoDB ficar saudável antes de iniciar a API. Os serviços ficam
disponíveis em:

| Serviço | Endereço padrão | Finalidade |
| --- | --- | --- |
| API | `http://localhost:3333` | Endpoints REST |
| Swagger UI | `http://localhost:3333/api-docs` | Documentação interativa |
| MongoDB | `mongodb://localhost:27017` | Acesso ao banco pelo host |

Confira o estado e os logs:

```bash
docker compose ps
docker compose logs -f api
```

Um teste rápido da aplicação pode ser feito com:

```bash
curl http://localhost:3333/
```

Resposta esperada:

```json
{"isActive":true}
```

### 3. Popule o banco de desenvolvimento (opcional)

O seeder apaga os dados existentes antes de inserir a massa de exemplo. Execute-o
somente em um ambiente descartável:

```bash
docker compose run --rm seed
```

### 4. Pare ou remova a stack

Para parar os contêineres preservando o banco:

```bash
docker compose down
```

Para também apagar permanentemente o volume e todos os dados do MongoDB:

```bash
docker compose down -v
```

## Composição da stack

| Serviço | Imagem | Detalhes |
| --- | --- | --- |
| `api` | Construída pelo `Dockerfile` | Node.js 22 Alpine, usuário não-root, dependências de produção e health check HTTP |
| `mongodb` | `mongo:7.0.41` | Autenticação habilitada, health check e volume persistente |
| `seed` | Mesma imagem da API | Serviço utilitário executado sob demanda com `docker compose run --rm seed` |

Dentro da rede do Compose, a API acessa o banco pelo hostname `mongodb`. A variável
`MONGODB_URL` do host é substituída automaticamente no contêiner, portanto não é
necessário editar a URL ao alternar entre execução local e Docker.

## Variáveis de ambiente

| Variável | Padrão no Docker | Descrição |
| --- | --- | --- |
| `PORT_SERVER` | `3333` | Porta HTTP exposta no host |
| `MONGODB_PORT` | `27017` | Porta do MongoDB exposta no host |
| `MONGODB_DATABASE` | `ecoweb` | Nome do banco de dados |
| `MONGODB_USERNAME` | `ecoweb` | Usuário administrador do MongoDB de desenvolvimento |
| `MONGODB_PASSWORD` | `ecoweb_dev_password` | Senha do MongoDB de desenvolvimento |
| `MONGODB_AUTH_SOURCE` | `admin` | Banco no qual o usuário do MongoDB é autenticado |
| `MONGODB_URL` | Gerada pelo Compose | URL usada pelo Mongoose; necessária ao executar a API no host |
| `LOG_LEVEL` | `info` | Nível mínimo dos logs JSON emitidos pela API em produção |

Use segredos fortes fora do desenvolvimento. Se as credenciais de uma stack existente
forem alteradas, recrie o volume ou atualize o usuário no MongoDB: as variáveis
`MONGO_INITDB_*` só são aplicadas na primeira inicialização de um volume vazio.

## Desenvolvimento sem o contêiner da API

### Requisitos

- Node.js 22 ou superior
- npm
- MongoDB acessível localmente ou por URL remota

Instale as dependências e configure o ambiente:

```bash
npm ci
cp .env.example .env
```

Você pode iniciar somente o MongoDB no Docker e executar a API com recarregamento no host:

```bash
docker compose up -d mongodb
npm run dev
```

Também é possível informar outra conexão em `MONGODB_URL` e executar diretamente:

```bash
npm start
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Executa a API com reinicialização automática pelo Nodemon |
| `npm start` | Executa a API em modo normal |
| `npm test` | Executa a suíte unitária com `node:test` |
| `npm run test:watch` | Executa os testes em modo de observação |
| `npm run docs:check` | Valida a especificação Swagger e suas referências |
| `npm run seed` | Apaga e recria a massa de desenvolvimento |
| `npm run seed:destroy` | Apaga os dados das coleções usadas pelo seeder |

## Documentação da API

Com a aplicação em execução, abra [http://localhost:3333/api-docs](http://localhost:3333/api-docs).
Se `PORT_SERVER` foi alterada, use a mesma porta na URL. O Swagger documenta todas as
rotas, parâmetros, corpos, respostas, erros, exemplos e autenticação.

As rotas privadas usam JWT. Depois do login, envie o token no cabeçalho:

```http
Authorization: Bearer <token>
```

Na interface Swagger, clique em **Authorize** e informe o token para experimentar as
operações protegidas.

## Testes

Os testes usam o executor nativo `node:test` e ficam em `test/`, espelhando a estrutura
de `src/`. Eles exercitam middlewares, schemas, validadores e serviços com dependências
simuladas, sem exigir MongoDB externo.

```bash
npm test
```

## Estrutura principal

```text
.
├── Dockerfile
├── docker-compose.yml
├── public/
├── src/
│   ├── application/       # Serviços e validações
│   ├── docs/              # Especificação OpenAPI e validador
│   ├── domain/            # Modelos e repositórios
│   ├── http/              # Rotas, controllers e middlewares
│   ├── infra/             # Banco, logs e seeders
│   ├── shared/            # Configurações e erros compartilhados
│   ├── app.js             # Composição do Express
│   └── server.js          # Inicialização do servidor HTTP
└── test/
```

## Solução de problemas

- **Porta já em uso:** altere `PORT_SERVER` ou `MONGODB_PORT` no `.env`.
- **Versão do MongoDB:** a imagem está fixada em `7.0.41` porque o MongoDB 8.x
  possui uma incompatibilidade conhecida com kernels Linux 6.19 ou superiores.
  Consulte o [comunicado do MongoDB](https://www.mongodb.com/community/forums/t/mongodb-8-x-and-linux-kernel-6-19/337547)
  antes de atualizar a versão.
- **API aguardando o banco:** execute `docker compose ps` e
  `docker compose logs mongodb` para verificar o health check.
- **Credenciais alteradas, mas login no banco falha:** o volume já foi inicializado com
  credenciais anteriores. Em desenvolvimento, recrie-o com `docker compose down -v`.
- **Reconstrução necessária:** use `docker compose up -d --build` depois de alterar
  dependências ou o `Dockerfile`.

## Licença

Distribuído sob a licença ISC, conforme declarado no `package.json`.
