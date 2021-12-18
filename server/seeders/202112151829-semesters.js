module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('semesters', [
      {year:2010,term:1},
      {year:2010,term:2},
      {year:2010,term:3},
      {year:2011,term:1},
      {year:2011,term:2},
      {year:2011,term:3},
      {year:2012,term:1},
      {year:2012,term:2},
      {year:2012,term:3},
      {year:2013,term:1},
      {year:2013,term:2},
      {year:2013,term:3},
      {year:2014,term:1},
      {year:2014,term:2},
      {year:2014,term:3},
      {year:2015,term:1},
      {year:2015,term:2},
      {year:2015,term:3},
      {year:2016,term:1},
      {year:2016,term:2},
      {year:2016,term:3},
      {year:2017,term:1},
      {year:2017,term:2},
      {year:2017,term:3},
      {year:2018,term:1},
      {year:2018,term:2},
      {year:2018,term:3},
      {year:2019,term:1},
      {year:2019,term:2},
      {year:2019,term:3},
      {year:2020,term:1},
      {year:2020,term:2},
      {year:2020,term:3},
      {year:2021,term:1},
      {year:2021,term:2},
      {year:2021,term:3}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('semesters', null, {});
  }
};
