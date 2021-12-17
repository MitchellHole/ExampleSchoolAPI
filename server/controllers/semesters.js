import db from '../models';
const { Op } = require("sequelize");
import semestersRequests from './requests/semesterRequest';


const semestersController = {

  createSemester: async (req, res) => {
    let requestCheck = semestersRequests.validateCreateSemester(req)
    if (requestCheck === "INVALID_BODY") {
      return res.status(400).json({
        "Name": "InvalidArguments",
        "Message": "Missing body params"
      })
    }
    else if (requestCheck === "INVALID_SEMESTER") {
      return res.status(400).json({
        "Name": "InvalidArguments",
        "Message": "Invalid Semester"
      })
    }

    db.semesters.create(req.body).then((data) => {
      return res.status(201).json(data);
    }).catch(error => {
      switch (error.name) {
              case 'SequelizeDatabaseError': return res.status(500).json({"Name": error.name, "Message": "Error instering into database"});
              case 'SequelizeUniqueConstraintError': return res.status(409).json({"Name": error.name, "Message": error.errors[0].message});
              default: return res.status(500).json({"Message": "Unknown error"});
      }
    })
  },
  getSemester: async (req, res) => {
    db.semesters.findOne({
      where: {id: req.params.id}
    }).then((semester) => {
      if (!semester) {
        return res.status(404).json({"semester": "Semester not found."});
      }
      return res.status(200).json(semester);
    }).catch(e => {
      console.log(e);
      return res.status(500).json({"error": "Error getting semester"});
    })
  },
  getSemesters: async (req, res) => {
    db.semesters.findAll().then((semesters) => {
      return res.status(200).json(semesters);
    }).catch(e => {
      console.log(e);
      return res.status(500).json({"error": "Error getting semesters"});
    })
  },
  getCurrentSemester: async (req, res) => {
    db.semesters.findOne({
      order: [
          ['year', 'DESC'],
          ['term', 'DESC'],
      ],
    }).then((semester) => {
      return res.status(200).json(semester);
    }).catch(e => {
      console.log(e);
      return res.status(500).json({"error": "Error getting semester"});
    })
  },

}

export default semestersController;
