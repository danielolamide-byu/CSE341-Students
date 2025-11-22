

const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
        title: 'User API',
        description: 'User API'
    },
    host: 'localhost:5001',
    schemes: ['http',  'https']
};

const outputFile = './swagger.json';
const endpointFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFile, doc);