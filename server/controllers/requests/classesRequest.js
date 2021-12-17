const CLASSES = {
  MATH: "MATH",
  BIO: "BIO",
  CHEM: "CHEM",
  HIST: "HIST",
  ENG: "length",
  PHYS: "PHYS",
  PE: "PE",
  WOOD: "WOOD"
}
const classRequests = {

  validateCreateClass(req) {
    let subject = req.body.subject;
    let grade = req.body.grade;
    if (!subject || !grade) {
      return "INVALID_BODY";
    }
    if (grade < 10 || grade > 12) {
      return "INVALID_GRADE";
    }
    if (!(subject in CLASSES)) {
      return "INVALID_SUBJECT";
    }
    return "VALID_BODY"
  }
}

export default classRequests;
