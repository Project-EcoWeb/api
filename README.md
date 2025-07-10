# 🌱 EcoWeb API

API RESTful desenvolvida em **Node.js** com **Express** para o projeto **EcoWeb**, uma plataforma digital que conecta empresas que possuem resíduos recicláveis a pessoas interessadas em reaproveitá-los de forma criativa e sustentável.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) — Ambiente de execução JavaScript no servidor.
- [Express](https://expressjs.com/) — Framework minimalista para criação de APIs.
- [MongoDB](https://www.mongodb.com/) — Banco de dados NoSQL orientado a documentos.
- [Mongoose](https://mongoosejs.com/) — ODM para modelagem de dados no MongoDB.
- [dotenv](https://www.npmjs.com/package/dotenv) — Gerenciamento de variáveis de ambiente.
- [Cors](https://www.npmjs.com/package/cors) — Middleware para habilitar CORS.
- [JWT](https://jwt.io/) — Autenticação baseada em tokens.

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/Project-EcoWeb/api.git
cd api
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` com as seguintes variáveis:

```env
PORT_SERVER=3000
MONGODB_URI=seu_link_do_mongodb
```

Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

---

## 📚 Estrutura do Projeto

```
ECOWEB-api/
│
├── controllers/       # Lógica de controle (ex: login, materiais, projetos)
├── models/            # Modelos de dados (Mongoose)
├── routes/            # Definição das rotas da API
├── middlewares/       # Middlewares (ex: autenticação)
├── config/            # Conexão com MongoDB e variáveis de ambiente
├── .env               # Configurações sensíveis (não subir para o GitHub)
├── server.js          # Ponto de entrada principal
└── README.md          # Este arquivo
```

---

## 🔐 Autenticação

- JWT (JSON Web Token) é utilizado para proteger rotas privadas.
- Após login, o token deve ser enviado no `Authorization Header` como:  
  `Bearer seu_token`.

---

## 🔄 Principais Rotas

### Auth

| Método | Rota            | Descrição                  |
|--------|------------------|-----------------------------|
| POST   | `/api/register` | Cadastro de usuário        |
| POST   | `/api/login`    | Login de usuário           |

### Projetos

| Método | Rota               | Descrição                         |
|--------|--------------------|------------------------------------|
| GET    | `/api/projetos`     | Listar todos os projetos           |
| POST   | `/api/projetos`     | Criar novo projeto (auth)          |
| GET    | `/api/projetos/:id` | Obter detalhes de um projeto       |

### Materiais

| Método | Rota                 | Descrição                         |
|--------|----------------------|------------------------------------|
| GET    | `/api/materiais`     | Listar materiais disponíveis       |
| POST   | `/api/materiais`     | Cadastrar novo material (empresa) |
| GET    | `/api/materiais/:id` | Obter detalhes de um material      |

---

## 👥 Tipos de Usuário

- **Usuário comum:** Pode visualizar materiais, salvar favoritos e cadastrar projetos.
- **Empresa:** Pode cadastrar e gerenciar resíduos recicláveis.

---

## 🧪 Testando a API

Você pode utilizar ferramentas como o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar as rotas da API.

---

## ✅ Próximos Passos

- Upload de imagens via Cloudinary ou Firebase
- Dashboard com estatísticas e relatórios
- Gerar receitas através de projetos e materias recicláveis

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---
