module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('semesters', [
      {year:2018,term:1,finalized: true},
      {year:2019,term:1,finalized: true},
      {year:2020,term:1,finalized: true},
      {year:2021,term:1,finalized: true},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('semesters', null, {});
  }
};
