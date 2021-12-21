import db from '../models';
import kcAdminClient from './keycloak'
import studentRequests from './requests/studentRequest';
import createUser from "./keycloak";
import resetPassword from "./keycloak";
const { Op } = require("sequelize");


const studentsController = {
  createStudent: async (req, res) => {
    let requestCheck = studentRequests.validateCreateStudent(req)
    if (requestCheck === "INVALID_BODY") {
      return res.status(400).json({
        "Name": "InvalidArguments",
        "Message": "Missing body params"
      })
    }
    else if (requestCheck === "INVALID_GRADE") {
      return res.status(400).json({
        "Name": "InvalidArguments",
        "Message": "Invalid grade"
      })
    }
    else if (requestCheck === "INVALID_STUDENT_NUMBER") {
      return res.status(400).json({
        "Name": "InvalidArguments",
        "Message": "Invalid student number"
      })
    }

    let response
    db.students.create(req.body).then((data) => {
      response = data
    }).catch(error => {
      switch (error.name) {
              case 'SequelizeDatabaseError': return res.status(500).json({"Name": error.name, "Message": "Error instering into database"});
              case 'SequelizeUniqueConstraintError': return res.status(409).json({"Name": error.name, "Message": error.errors[0].message});
              default: return res.status(500).json({"Message": "Unknown error"});
      }
    }).then(async () => {
      try {
        await kcAdminClient.auth({
          username: 'admin',
          password: 'admin',
          grantType: 'password',
          clientId: 'admin-cli'
        });

        const user = createUser(req)
        resetPassword(user)
      } catch (error) {
        return res.status(500).json({"Name": error.name, "Message": error.message})
      }
      return res.status(201).json(response);
    })
  },

  getStudents: async (req, res) => {
    db.students.findAll().then((students) => {
      return res.status(200).json(students);
    }).catch(e => {
      console.log(e);
      return res.status(500).json({"error": "Error getting students"});
    })
  },

  getStudent: async (req, res) => {
    db.students.findOne({
      where: {id: req.params.id}
    }).then((student) => {
      if (!student) {
        return res.status(404).json({"message": "Student not found."});
      }
      else if (req.kauth.grant.access_token.content.realm_access.roles.includes("student") && (student.student_number !== req.kauth.grant.access_token.content.student_number)) {
        console.log(student.student_number)
        console.log(req.kauth.grant.access_token.content.student_number)
        console.log(req.kauth.grant.access_token.content.student_number === student.student_number)
        return res.status(403).json({"Name": "InvalidAccessError", "Message": "Not authorized to access this student"})
      }
      return res.status(200).json(student);
    })
  },

  updateStudent: async (req, res) => {
    db.students.findOne({
      where: {id: req.params.id}
    }).then((student) => {
      if (!student) {
        return res.status(404).json({"message": "Student not found."});
      }

      let requestCheck = studentRequests.validateCreateStudent(req)
      if (requestCheck === "INVALID_BODY") {
        return res.status(400).json({
          "Name": "InvalidArguments",
          "Message": "Missing body params"
        })
      }
      else if (requestCheck === "INVALID_GRADE") {
        return res.status(400).json({
          "Name": "InvalidArguments",
          "Message": "Invalid grade"
        })
      }
      else if (requestCheck === "INVALID_STUDENT_NUMBER") {
        return res.status(400).json({
          "Name": "InvalidArguments",
          "Message": "Invalid student number"
        })
      }

      student.update(req.body).then((student) => {
        return res.status(200).json(student);
      }).catch(e => {
        console.log(e);
        return res.status(500).json({"error": "Error updating student"});
      })
    })
  },

  updateStudentGraduation: async (req, res) => {
    db.students.findOne({
      where: {id: req.params.id}
    }).then((student) => {
      if (!student) {
        return res.status(404).json({"message": "Student not found."});
      }
      student.update({"is_graduated": true}).then((student) => {
        return res.status(200).json(student);
      }).catch(e => {
        console.log(e);
        return res.status(500).json({"error": "Error graduating student"});
      })
    })
  }

}


export default studentsController;
