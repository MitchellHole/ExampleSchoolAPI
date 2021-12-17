import bodyParser from 'body-parser';
import semestersController from '../controllers/semesters';

const express = require('express');
const keycloak = require('../config/keycloak-config.js').getKeycloak();
const app = require('../app.js')

const semestersRouter = express.Router();

/**
* @typedef semesterModel
* @property {integer} year.required - semesters's year - eg: 2018
* @property {integer} term.required - semester's term - eg: 2
*/

/**
* @typedef returnSemesterModel
* @property {integer} id.required - id - eg: 10
* @property {integer} year.required - semesters's year - eg: 2018
* @property {integer} term.required - semester's term - eg: 2
*/

/**
 * Create a semester
 * @route POST /semesters
 * @group Semesters - Operations about semesters
 * @param {semesterModel.model} semesterModel.body.required - the new virtual model
 * @returns {returnSemesterModel.model} 201 - A JSON object with created user info
 * @returns {Error}  409 - Semester with same year / term already present
 * @returns {Error}  400 - InvalidArguments
 * @security JWT
 */
semestersRouter.post('/', keycloak.protect('principal'), bodyParser.json(), semestersController.createSemester);

/**
 * Get all semesters
 * @route GET /semesters
 * @group Semesters - Operations about semesters
 * @returns {Array.<returnSemesterModel>} 200 - A JSON object all semester info
 * @security JWT
 */
semestersRouter.get('/', keycloak.protect(['principal', 'teacher', 'student']), bodyParser.json(), semestersController.getSemesters);

/**
 * Get the latest semester
 * @route GET /semesters/current
 * @group Semesters - Operations about semesters
 * @returns {returnSemesterModel.model} 200 - A JSON object with latest semester info
 * @security JWT
 */
semestersRouter.get('/current', keycloak.protect(['principal', 'teacher', 'student']), bodyParser.json(), semestersController.getCurrentSemester);

/**
 * Get semester info
 * @route GET /semesters/:id
 * @group Semesters - Operations about semesters
 * @param {int} id.path.required - id of the semester
 * @returns {returnSemesterModel.model} 200 - A JSON object with semester info
 * @security JWT
 */
semestersRouter.get('/:id', keycloak.protect(['principal', 'teacher', 'student']), bodyParser.json(), semestersController.getSemester);

module.exports = semestersRouter;
