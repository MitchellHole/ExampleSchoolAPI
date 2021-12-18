const CLASSES = {
  MATH: "Math",
  BIO: "Biology",
  CHEM: "Chemistry",
  HIST: "History",
  ENG: "English",
  FR: "French",
  ESP: "Spanish",
  PHYS: "Physics",
  PE: "Physical Education",
  AUTO: "Auto",
  COOK: "Cooking",
  ART: "Art",
  WOOD: "Woodworking",
  PLAN: "Planning",
  BAND: "Band"
}
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
    if (!(subject in CLASSES)) {
      return "INVALID_SUBJECT";
    }
    return "VALID_BODY"
  }
}

export default classRequests;
