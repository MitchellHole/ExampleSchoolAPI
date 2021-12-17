const semesterRequests = {

  validateCreateSemester(req) {
    let year = req.body.year;
    let term = req.body.term;
    if (!year || !term) {
      return "INVALID_BODY";
    }
    if (term > 3 || term < 1) {
      return "INVALID_SEMESTER";
    }
    return "VALID_BODY"
  }
}

export default semesterRequests;
