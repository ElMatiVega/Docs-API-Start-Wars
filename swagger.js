const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const axios = require("axios");
const morgan = require("morgan");
const catchedAsync = require("./util/catchedAsync");
const response = require("./util/response");

const port = process.env.PORT || 5000;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Star Wars API Microservices",
      descriptions: "API Information of characters, planets and films",
      contact: {
        name: "MV Dev",
        url:"https://www.linkedin.com/in/mat%C3%ADas-vega-dev/",
        email:"mvfullstackdevelopers@gmail.com"
      },
      servers: ["http://localhost:5000"],
      servers: ["http://34.16.148.187:8000"],
    },
  },

  apis: ["./swagger.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCssUrl:
    "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-monokai.css",
}));
app.use(morgan("dev"));

//Routes

/**
 * @swagger
 * /characters:
 *  get:
 *    description: Use to request all characters
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Error en la ruta del endPoints
 *
 */



catchedAsync(
  app.get("/characters", async (req, res) => {
    try {
      const results = await axios.get("http://34.16.148.187:8000/characters");
      response(res, 200, results.data);
    } catch (error) {
      //console.log(error.response.status, error.response.statusText)
      res.status(error.response.status).json({
        response: error.code,
        cause: error.response.statusText,
      });
    }
  })
);

/**
 * @swagger
 * /films:
 *  get:
 *    description: Use to request all films
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Error en la ruta del endPoints
 *
 */
catchedAsync(
  app.get("/films", async (req, res) => {
    try {
      const results = await axios.get("http://34.16.148.187:8000/films");
      response(res, 200, results.data);
    } catch (error) {
      res.status(error.response.status).json({
        response: error.code,
        cause: error.response.statusText,
      });
    }
  })
);


/**
 * @swagger
 * /planets:
 *  get:
 *    description: Use to request all planets
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Error en la ruta del endPoints
 */
catchedAsync(
  app.get("/planets", async (req, res) => {
    try {
      const results = await axios.get("http://34.16.148.187:8000/planets");
      response(res, 200, results.data);
    } catch (error) {
      res.status(error.response.status).json({
        response: error.code,
        cause: error.response.statusText,
      });
    }
  })
);



app.listen(port, () => {
  console.log(`Server listening on port ${port},
    http://localhost:5000/api-docs/ `);
});
