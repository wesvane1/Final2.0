const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Sour Dough API',
    description: 'This is where all routes are held.'
  },
  host: 'cse341personal-35nf.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc);