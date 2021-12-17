import db from '../models';
const { Op } = require("sequelize");
import teacherRequests from './requests/teacherRequest';


const teachersController = {

  createTeacher: async (req, res) => {
    let requestCheck = teacherRequests.validateCreateTeacher(req)
    if (requestCheck === "INVALID_BODY") {
      return res.status(400).json({
        "Name": "InvalidArguments",
        "Message": "Missing body params"
      })
    }
    else if (requestCheck === "INVALID_SUBJECT") {
      return res.status(400).json({
        "Name": "InvalidSubject",
        "Message": "Invalid subject"
      })
    }
    db.teachers.create(req.body).then((data) => {
      return res.status(201).json(data);
    }).catch(error => {
      switch (error.name) {
              case 'SequelizeDatabaseError': return res.status(500).json({"Name": error.name, "Message": "Error instering into database"});
              case 'SequelizeUniqueConstraintError': return res.status(409).json({"Name": error.name, "Message": error.errors[0].message});
              default: return res.status(500).json({"Message": "Unknown error"});
      }
    })
  },

  updateTeacher: async (req, res) => {
    db.teachers.findOne({
      where: {id: req.params.id}
    }).then((teacher) => {
      if (!teacher) {
        return res.status(404).json({"message": "Teacher not found."});
      }

      let requestCheck = teacherRequests.validateCreateTeacher(req)
      if (requestCheck === "INVALID_BODY") {
        return res.status(400).json({
          "Name": "InvalidArguments",
          "Message": "Missing body params"
        })
      }
      else if (requestCheck === "INVALID_SUBJECT") {
        return res.status(400).json({
          "Name": "InvalidSubject",
          "Message": "Invalid Subject"
        })
      }

      teacher.update(req.body).then((teacher) => {
        return res.status(200).json(teacher);
      }).catch(e => {
        console.log(e);
        return res.status(500).json({"error": "Error updating teacher"});
      })
    })
  },

  getTeacher: async (req, res) => {
    db.teachers.findOne({
      where: {id: req.params.id}
    }).then((teacher) => {
      if (!teacher) {
        return res.status(404).json({"message": "Teacher not found."});
      }
      else if (req.kauth.grant.access_token.content.realm_access.roles.includes("student") && (student.student_number != req.kauth.grant.access_token.content.student_number)) {
        return res.status(403).json({"Name": "InvalidAccessError", "Message": "Not authorized to access this student"})
      }
      return res.status(200).json(teacher);
    })
  },

  getTeachers: async (req, res) => {
    db.teachers.findAll().then((teachers) => {
      return res.status(200).json(teachers);
    }).catch(e => {
      console.log(e);
      return res.status(500).json({"error": "Error getting teachers"});
    })
  },
}

export default teachersController;
