import db from '../models';
const { Op } = require("sequelize");

const classOfferingsController = {
  createClassOffering: async (req, res) => {
    db.class_offerings.create(req.body).then((data) => {
      return res.status(201).json(data);
    }).catch(error => {
      switch (error.name) {
              case 'SequelizeDatabaseError': return res.status(500).json({"Name": error.name, "Message": "Error instering into database"});
              case 'SequelizeUniqueConstraintError': return res.status(409).json({"Name": error.name, "Message": error.errors[0].message});
              default: return res.status(500).json({"Message": "Unknown error"});
      }
    })
  },
  getClassOfferings: async (req, res) => {
    db.class_offerings.findAll({
      include: [
        {model: db.semesters, attributes:['year','term']},
        {model: db.classes, attributes:['subject','grade']},
        {model: db.teachers, attributes:['name']}
    ]
    }).then((myClass) => {
      return res.status(200).json(myClass);
    })
  },

  getClassOffering: async (req, res) => {
    db.class_offerings.findOne({
      where: {id: req.params.id},
      include: [
        {model: db.semesters, attributes:['year','term']},
        {model: db.classes, attributes:['subject','grade']},
        {model: db.teachers, attributes:['name']}
    ]
    }).then((myClass) => {
      if (!myClass) {
        return res.status(404).json({"message": "Class offering not found."});
      }
      return res.status(200).json(myClass);
    })
  },
}

export default classOfferingsController;
