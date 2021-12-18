const classRequests = {

  validateCreateClass(req) {
    let subject = req.body.subject;
    let grade = req.body.grade;
    if (!subject || !grade) {
      return "INVALID_BODY";
    }
    if (grade < 9 || grade > 12) {
      return "INVALID_GRADE";
    }
    return "VALID_BODY"
  }
}

export default classRequests;
