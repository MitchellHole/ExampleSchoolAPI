import bodyParser from 'body-parser';
import studentsController from '../controllers/students';

const express = require('express');
const keycloak = require('../config/keycloak-config.js').getKeycloak();
const app = require('../app.js')

const studentsRouter = express.Router();

/**
* @typedef studentModel
* @property {string} name.required - name of student - eg: Fred Flintstone
* @property {integer} grade.required - student's grade - eg: 10
* @property {integer} student_number.required - student number - eg: 123456789
*/

/**
* @typedef returnStudentModel
* @property {integer} id.required - id - eg: 10
* @property {string} name.required - name of student - eg: Fred Flintstone
* @property {integer} grade.required - student's grade - eg: 10
* @property {integer} student_number.body.required - student number - eg: 123456789
*/

/**
 * Create a student
 * @route POST /students
 * @group Students - Operations about students
 * @param {studentModel.model} studentModel.body.required - the new virtual model
 * @returns {returnStudentModel.model} 201 - A JSON object with created user info
 * @returns {Error}  409 - Student with same student number already present
 * @returns {Error}  400 - InvalidArguments
 * @security JWT
 */
studentsRouter.post('/', keycloak.protect('principal'), bodyParser.json(), studentsController.createStudent);
/**
 * Get all student
 * @route GET /students
 * @group Students - Operations about students
 * @returns {Array.<returnStudentModel>} 200 - A list of JSON objects with all student info
 * @security JWT
 */
studentsRouter.get('/', keycloak.protect('principal'), bodyParser.json(), studentsController.getStudents);
/**
 * Get a student
 * @route GET /students/:id
 * @group Students - Operations about students
 * @param {int} id.path.required - id of the student
 * @returns {returnStudentModel.model} 200 - A JSON object with the users info
 * @returns {Error}  404 - Student not found
 * @security JWT
 */
studentsRouter.get('/:id', keycloak.protect('principal'), bodyParser.json(), studentsController.getStudent);
/**
 * Update a student
 * @route PUT /students/:id
 * @group Students - Operations about students
 * @param {int} id.path.required - id of the student
 * @param {studentModel.model} studentModel.body.required - the new virtual model
 * @param {int} id.path.required - id of the student
 * @returns {returnStudentModel.model} 200 - A JSON object with updated user info
 * @returns {Error}  404 - Student not found
 * @security JWT
 */
studentsRouter.put('/:id', keycloak.protect('principal'), bodyParser.json(), studentsController.updateStudent);
/**
 * Graduate a student
 * @route PATCH /students/:id/graduate
 * @group Students - Operations about students
 * @param {int} id.path.required - id of the student
 * @returns {returnStudentModel.model} 200 - A JSON object with updated user info
 * @returns {Error}  404 - Student not found
 * @security JWT
 */
studentsRouter.patch('/:id/graduate', keycloak.protect('principal'), bodyParser.json(), studentsController.updateStudentGraduation);


module.exports = studentsRouter;
