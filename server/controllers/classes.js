import db from '../models';
const { Op } = require("sequelize");
import classRequests from './requests/classesRequest';

const classesController = {
  createClass: async (req, res) => {
    let requestCheck = classRequests.validateCreateClass(req)
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
    else if (requestCheck === "INVALID_GRADE") {
      return res.status(400).json({
        "Name": "InvalidArguments",
        "Message": "Invalid grade"
      })
    }
    db.classes.create(req.body).then((data) => {
      return res.status(201).json(data);
    }).catch(error => {
      switch (error.name) {
              case 'SequelizeDatabaseError': return res.status(500).json({"Name": error.name, "Message": "Error instering into database"});
              case 'SequelizeUniqueConstraintError': return res.status(409).json({"Name": error.name, "Message": error.errors[0].message});
              default: return res.status(500).json({"Message": "Unknown error"});
      }
    })
  },
  getClasses: async (req, res) => {
    db.classes.findAll().then((classes) => {
      return res.status(200).json(classes);
    }).catch(e => {
      console.log(e);
      return res.status(500).json({"error": "Error getting classes"});
    })
  },

  getClass: async (req, res) => {
    db.classes.findOne({
      where: {id: req.params.id}
    }).then((myClass) => {
      if (!myClass) {
        return res.status(404).json({"message": "Class not found."});
      }
      return res.status(200).json(myClass);
    })
  },

}

export default classesController;
