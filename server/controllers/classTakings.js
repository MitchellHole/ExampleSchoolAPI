import db from '../models';
const { Op } = require("sequelize");

const classTakingsController = {

  createClassTaking: async (req, res) => {
    db.class_takings.create(req.body).then((data) => {
      return res.status(201).json(data);
    }).catch(error => {
      switch (error.name) {
              case 'SequelizeDatabaseError': return res.status(500).json({"Name": error.name, "Message": "Error instering into database"});
              case 'SequelizeUniqueConstraintError': return res.status(409).json({"Name": error.name, "Message": error.errors[0].message});
              default: return res.status(500).json({"Message": "Unknown error"});
      }
    })
  },

  getClassTaking: async (req, res) => {
    db.class_takings.findOne({
      where: {id: req.params.id},
      include: [
        {model: db.students, attributes:['name', 'student_number']},
        {model: db.class_offerings,
          include: [
                {model: db.semesters, attributes:['year','term']},
                {model: db.classes, attributes:['subject','grade']},
                {model: db.teachers, attributes:['name']}
            ]}
    ]
    }).then((myClass) => {
      if (!myClass) {
        return res.status(404).json({"message": "Class taking not found."});
      }
      else if (req.kauth.grant.access_token.content.realm_access.roles.includes("student") && (myClass.student.student_number != req.kauth.grant.access_token.content.student_number)) {
        return res.status(403).json({"Name": "InvalidAccessError", "Message": "Not authorized to access this student"})
        console.log(myClass.student.student_number)
        return res.status(200).json(myClass);
      }
      return res.status(200).json(myClass);
    })
  },

  getClassTakings: async (req, res) => {
    db.class_takings.findAll({
      include: [
        {model: db.students, attributes:['name', 'student_number']},
        {model: db.class_offerings,
          include: [
                {model: db.semesters, attributes:['year','term']},
                {model: db.classes, attributes:['subject','grade']},
                {model: db.teachers, attributes:['name']}
            ]}
    ]
    }).then((myClass) => {
      return res.status(200).json(myClass);
    })
  },

  updateClassTakingGrade: async (req, res) => {
    db.class_takings.findOne({
      where: {id: req.params.id}
    }).then((classTaking) => {
      if (!classTaking) {
        return res.status(404).json({"message": "Class taking not found."});
      }
      classTaking.update({"grade": req.body.grade}).then((graded) => {
        return res.status(200).json(graded);
      }).catch(e => {
        console.log(e);
        return res.status(500).json({"error": "Error updating grade"});
      })
    })
  },
}

export default classTakingsController;
