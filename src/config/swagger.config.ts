/**
 * Swagger Configuration
 */
export const SwaggerConfig = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Web APIs for Movie List',
      version: '1.0.0',
      description: 'List of APIs for Movie Service',
      // license: {
      //     name: 'Licensed Under MIT',
      //     url: 'https://spdx.org/licenses/MIT.html',
      // },
      contact: {
        name: 'My Movie Watch List',
        // url: 'https://jsonplaceholder.typicode.com',
      },
    },
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'localhost server',
      },
    ],
  },
  // apis: ['src/api/routes/*.ts'],
  apis: [
    'src/api/routes/*.ts',
    'src/api/swagger/*.ts',
    'src/api/swagger/models/*.ts',
    'src/api/routes/*/**.ts',
  ],
};
