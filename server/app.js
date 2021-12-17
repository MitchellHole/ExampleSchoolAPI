import express from 'express';
import bodyParser from 'body-parser';
import studentsRouter from './api/students-api'
import teachersRouter from './api/teachers-api'
import semestersRouter from './api/semesters-api'
import classesRouter from './api/classes-api'
import classOfferingsRouter from './api/classofferings-api'
import classTakingsRouter from './api/classtakings-api'


var Keycloak = require('keycloak-connect');
const session = require('express-session');


const app = express();
const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:9000',
        basePath: '/api',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./api/*.js'] //Path to the API handle folder
};
expressSwagger(options)

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak({
  store: memoryStore
});

app.use(keycloak.middleware());
app.use('/api/students', studentsRouter);
app.use('/api/teachers', teachersRouter);
app.use('/api/semesters', semestersRouter);
app.use('/api/classes', classesRouter);
app.use('/api/classofferings', classOfferingsRouter);
app.use('/api/classtakings', classTakingsRouter);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

export default app;
