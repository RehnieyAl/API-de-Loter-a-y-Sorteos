
// Configuración de Swagger para documentar la API REST
const swaggerJsdoc = require("swagger-jsdoc");
const { port } = require("../config");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "API de Lotería y Sorteos",
      version: "1.0.0",
      description: "Documentación oficial de la API REST",
    },

    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Servidor de desarrollo",
      },
    ],

    tags: [
      {
        name: "Authentication",
        description: "Autenticación y autorización",
      },
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Introduce tu token JWT",
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
