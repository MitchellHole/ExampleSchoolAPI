import bodyParser from 'body-parser';
import classTakingsController from '../controllers/classTakings';

const express = require('express');
const keycloak = require('../config/keycloak-config.js').getKeycloak();
const app = require('../app.js')

const classTakingsRouter = express.Router();

/**
* @typedef classTakingsModel
* @property {integer} student_id.required - student id - eg: 1
* @property {integer} class_offering_id.required - class offering id - eg: 4
*/

/**
* @typedef returnClassTakingsModel
* @property {integer} id.required - id - eg: 10
* @property {integer} student_id.required - student id - eg: 1
* @property {integer} class_offering_id.required - class offering id - eg: 4
* @property {string} grade - grade for the course - eg: null
* @property {returnClassOfferingsModel.model} classOffering.required
* @property {returnStudentModel.model} student.required
*/

/**
 * Create a class taking
 * @route POST /classtakings
 * @group Class Takings - Operations about class takings
 * @param {classTakingsModel.model} classTaking.body.required - the new virtual model
 * @returns {returnClassTakingsModel.model} 201 - A JSON object with class takings info
 * @returns {Error}  400 - InvalidArguments
 * @security JWT
 */
classTakingsRouter.post('/', keycloak.protect(['student']), bodyParser.json(), classTakingsController.createClassTaking);

/**
 * Get class takings
 * @route GET /classtakings
 * @group Class Takings - Operations about class takings
 * @returns {Array.<returnClassTakingsModel>} 200 - A JSON object with class takings info
 * @returns {Error}  400 - InvalidArguments
 * @security JWT
 */
classTakingsRouter.get('/', keycloak.protect(['principal', 'teacher', 'student']), bodyParser.json(), classTakingsController.getClassTakings);

/**
 * Get class taking
 * @route GET /classtakings/:id
 * @param {int} id.path.required - id of the class taking
 * @group Class Takings - Operations about class takings
 * @returns {returnClassTakingsModel.model} 200 - A JSON object with class takings info
 * @security JWT
 */
classTakingsRouter.get('/:id', keycloak.protect(['principal', 'teacher', 'student']), bodyParser.json(), classTakingsController.getClassTaking);

/**
 * Update class taking grade
 * @route PATCH /classtakings/:id/grade
 * @param {int} id.path.required - id of the class taking
 * @param {string} grade.body.required - grade - eg: 1
 * @group Class Takings - Operations about class takings
 * @returns {returnClassTakingsModel.model} 200 - A JSON object with class takings info
 * @security JWT
 */
classTakingsRouter.patch('/:id/grade', keycloak.protect(['teacher']), bodyParser.json(), classTakingsController.updateClassTakingGrade);

module.exports = classTakingsRouter;
