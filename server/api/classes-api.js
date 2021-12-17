import bodyParser from 'body-parser';
import classesController from '../controllers/classes';

const express = require('express');
const keycloak = require('../config/keycloak-config.js').getKeycloak();
const app = require('../app.js')

const classesRouter = express.Router();

/**
* @typedef classModel
* @property {string} subject.required - classes' subject - eg: BIO
* @property {integer} grade.required - classes' grade level - eg: 11
*/

/**
* @typedef returnClassModel
* @property {integer} id.required - id - eg: 10
* @property {string} subject.required - classes' subject - eg: BIO
* @property {integer} grade.required - classes' grade level - eg: 11
*/

/**
 * Create a class
 * @route POST /classes
 * @group Classes - Operations about classes
 * @param {classModel.model} classModel.body.required - the new virtual model
 * @returns {returnClassModel.model} 201 - A JSON object with class info
 * @returns {Error}  409 - Class with same subject / grade already present
 * @returns {Error}  400 - InvalidArguments
 * @security JWT
 */
classesRouter.post('/', keycloak.protect('principal'), bodyParser.json(), classesController.createClass);

/**
 * Get all classes
 * @route GET /classes
 * @group Classes - Operations about classes
 * @returns {Array.<returnClassModel>} 201 - A JSON object with all class info
 * @security JWT
 */
classesRouter.get('/', keycloak.protect(['principal', 'teacher', 'student']), bodyParser.json(), classesController.getClasses);

/**
 * Get class
 * @route GET /classes/:id
 * @group Classes - Operations about classes
 * @param {int} id.path.required - id of the class
 * @returns {returnClassModel.model} 201 - A JSON object with all class info
 * @security JWT
 */
classesRouter.get('/:id', keycloak.protect(['principal', 'teacher', 'student']), bodyParser.json(), classesController.getClass);

module.exports = classesRouter;
