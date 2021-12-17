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

const teacherRequests = {
  validateCreateTeacher(req) {
    let name = req.body.name;
    let subject = req.body.subject;
    let startedAt = req.body.started_at;
    if (!name || !subject || !startedAt) {
      return "INVALID_BODY";
    }
    if (!(subject in CLASSES)) {
      return "INVALID_SUBJECT";
    }
    return "VALID_BODY"
  }

}

export default teacherRequests;
