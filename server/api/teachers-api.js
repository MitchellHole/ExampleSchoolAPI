import bodyParser from 'body-parser';
import teachersController from '../controllers/teachers';

const express = require('express');
const keycloak = require('../config/keycloak-config.js').getKeycloak();
const app = require('../app.js')

const teachersRouter = express.Router();

/**
* @typedef teachersModel
* @property {string} name.required - name of teacher - eg: Fred Flintstone
* @property {string} subject.required - Subject taught - eg: MATH
* @property {date} started_at.body.required - Date started - eg: 2004-01-01
*/

/**
* @typedef teachersReturnModel
* @property {integer} id.required - id - eg: 10
* @property {string} name.required - name of teacher - eg: Fred Flintstone
* @property {string} subject.required - Subject taught - eg: MATH
* @property {date} started_at.body.required - Date started - eg: 2004-01-01
*/

/**
 * Create a teacher
 * @route POST /teachers
 * @group Teachers - Operations about teachers
 * @param {teachersModel.model} teachersModel.body.required - the new virtual model
 * @returns {teachersReturnModel.model} 201 - A JSON object with created user info
 * @returns {Error}  400 - InvalidArguments
 * @security JWT
 */
teachersRouter.post('/', keycloak.protect('principal'), bodyParser.json(), teachersController.createTeacher);
/**
 * Get a teacher
 * @route Get /teachers/:id
 * @param {int} id.path.required - id of the teacher
 * @group Teachers - Operations about teachers
 * @returns {teachersReturnModel.model} 200 - A JSON object with teacher info
 * @returns {Error}  404 - TeacherNotFound
 * @security JWT
 */
teachersRouter.get('/:id', keycloak.protect(['principal', 'teacher']), bodyParser.json(), teachersController.getTeacher);
/**
 * Get teachers
 * @route Get /teachers
 * @group Teachers - Operations about teachers
 * @returns {Array.<teachersReturnModel>} 200 - A JSON object with all teacher info
 * @security JWT
 */
teachersRouter.get('/', keycloak.protect('principal'), bodyParser.json(), teachersController.getTeachers);
/**
 * Create a teacher
 * @route PUT /teachers
 * @group Teachers - Operations about teachers
 * @param {teachersModel.model} teachersModel.body.required - the new virtual model
 * @returns {teachersReturnModel.model} 201 - A JSON object with updated user info
 * @returns {Error}  400 - InvalidArguments
 * @returns {Error}  404 - TeacherNotFound
 * @security JWT
 */
teachersRouter.put('/:id', keycloak.protect('principal'), bodyParser.json(), teachersController.updateTeacher);


module.exports = teachersRouter;
