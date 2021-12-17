import isNumeric from '../../utils/studentHelpers';

const studentRequests = {

  validateCreateStudent(req) {
    let name = req.body.name;
    let grade = req.body.grade;
    let studentNumber = req.body.student_number;
    if (!name || !grade || !studentNumber) {
      return "INVALID_BODY";
    }
    if (grade < 10 || grade > 12) {
      return "INVALID_GRADE";
    }
    if (studentNumber.length != 9 || !isNumeric(studentNumber)) {
      return "INVALID_STUDENT_NUMBER"
    }
    return "VALID_BODY"
  }
}

export default studentRequests;
