import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'api-ecoweb',
    version: '1.0.0',
    description: 'Documentação dos endpoints da API',
    contact: {
      name: 'Ruan',
      email: 'ruanoliveiradev@gmail',
    },
    'x-logo': {
      url: 'http://localhost:3000/public/logo.jpg',
      backgroundColor: '#FFFFFF',
      altText: 'logo ecoweb'
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desenvolvimento',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
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
  apis: ['./src/docs/routes/*.yaml', './src/docs/components/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;