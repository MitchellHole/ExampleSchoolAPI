module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teachers', [
      {name:"Mark Smith",subject:"English",started_at:"2010-01-01"},
      {name:"Kim Cowan",subject:"English",started_at:"2010-01-01"},
      {name:"Soraya Maldonado",subject:"English",started_at:"2010-01-01"},
      {name:"Charis Vance",subject:"English",started_at:"2010-01-01"},
      {name:"Rhianne Cannon",subject:"Math",started_at:"2010-01-01"},
      {name:"Francis Salt",subject:"Math",started_at:"2010-01-01"},
      {name:"Antonio Ayers",subject:"Math",started_at:"2010-01-01"},
      {name:"Katey Faulkner",subject:"Math",started_at:"2010-01-01"},
      {name:"Callam Regan",subject:"Biology",started_at:"2010-01-01"},
      {name:"Sebastien Howell",subject:"Biology",started_at:"2010-01-01"},
      {name:"Rares Hobbs",subject:"Physics",started_at:"2010-01-01"},
      {name:"Aron Shepard",subject:"Physics",started_at:"2010-01-01"},
      {name:"Isabell Fraser",subject:"Chemistry",started_at:"2010-01-01"},
      {name:"Tyreke Orr",subject:"Chemistry",started_at:"2010-01-01"},
      {name:"Charly Howe",subject:"History",started_at:"2010-01-01"},
      {name:"Maggie Hull",subject:"History",started_at:"2010-01-01"},
      {name:"Elena Adams",subject:"Physical Education",started_at:"2010-01-01"},
      {name:"Lucille Newman",subject:"Physical Education",started_at:"2010-01-01"},
      {name:"Tim Smith",subject:"Woodworking",started_at:"2010-01-01"},
      {name:"Harris Dunlap",subject:"Auto",started_at:"2010-01-01"},
      {name:"Alberto Burks",subject:"Cooking",started_at:"2010-01-01"},
      {name:"Ayman Monaghan",subject:"Band",started_at:"2010-01-01"},
      {name:"Bethany Stanton",subject:"Planning",started_at:"2010-01-01"},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teachers', null, {});
  }
};
