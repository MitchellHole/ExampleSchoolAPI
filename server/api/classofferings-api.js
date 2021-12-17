import bodyParser from 'body-parser';
import classOfferingsController from '../controllers/classOfferings';

const express = require('express');
const keycloak = require('../config/keycloak-config.js').getKeycloak();
const app = require('../app.js')

const classOfferingsRouter = express.Router();

/**
* @typedef classOfferingsModel
* @property {integer} class_id.required - class id - eg: 1
* @property {integer} teacher_id.required - class teacher id - eg: 4
* @property {integer} semester_id.required - class semester id - eg: 35
*/

/**
* @typedef returnClassOfferingsModel
* @property {integer} id.required - id - eg: 10
* @property {integer} class_id.required - class id - eg: 1
* @property {integer} teacher_id.required - class teacher id - eg: 4
* @property {integer} semester_id.required - class semester id - eg: 35
* @property {returnClassModel.model} class.required
* @property {teachersReturnModel.model} teacher.required
* @property {returnSemesterModel.model} semester.required
*/

/**
 * Create a class offering
 * @route POST /classofferings
 * @group Class Offerings - Operations about class offerings
 * @param {classOfferingsModel.model} classModel.body.required - the new virtual model
 * @returns {returnClassOfferingsModel.model} 201 - A JSON object with class info
 * @returns {Error}  400 - InvalidArguments
 * @security JWT
 */
classOfferingsRouter.post('/', keycloak.protect('principal'), bodyParser.json(), classOfferingsController.createClassOffering);

/**
 * Get all class offerings
 * @route GET /classofferings
 * @group Class Offerings - Operations about class offerings
 * @returns {Array.<returnClassOfferingsModel>} 200 - A JSON object with class info
 * @security JWT
 */
classOfferingsRouter.get('/', keycloak.protect(['principal', 'teacher', 'student']), bodyParser.json(), classOfferingsController.getClassOfferings);
/**
 * Get a class offerings
 * @route GET /classofferings/:id
 * @param {int} id.path.required - id of the class offering
 * @group Class Offerings - Operations about class offerings
 * @returns {returnClassOfferingsModel.model} 200 - A JSON object with class info
 * @security JWT
 */
classOfferingsRouter.get('/:id', keycloak.protect(['principal', 'teacher', 'student']), bodyParser.json(), classOfferingsController.getClassOffering);

module.exports = classOfferingsRouter;
