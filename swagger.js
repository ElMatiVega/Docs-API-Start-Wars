const express= require('express');
const app= express();
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const axios=require('axios');
const morgan = require("morgan");

const port = process.env.PORT || 5000;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions={
    swaggerDefinition:{
        info:{
            title: 'Star Wars API Microservices',
            descriptions:'API Information of characters, planets and films',
            contact: {
                name: 'API free'
            },
            servers: ['http://localhost:5000'],
            servers: ['http://34.16.148.187:8000']
        }
    },
    
    apis:['swagger.js'],
};

const swaggerDocs= swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
 */
/**
 * @swagger
 * /films:
 *  get:
 *    description: Use to request all films
 *    responses:
 *      '200':
 *        description: A successful response
 */
/**
 * @swagger
 * /planets:
 *  get:
 *    description: Use to request all planets
 *    responses:
 *      '200':
 *        description: A successful response
 */


app.get('/characters', async (req, res)=>{
    const results = await axios.get("http://34.16.148.187:8000/characters");
    res.json(results.data)
})
app.get('/films', async (req, res)=>{
    const results = await axios.get("http://34.16.148.187:8000/films");
    res.json(results.data)
})
app.get('/planets', async (req, res)=>{
    const results = await axios.get("http://34.16.148.187:8000/planets");
    res.json(results.data)
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port},
    http://localhost:5000/api-docs/ `);
});