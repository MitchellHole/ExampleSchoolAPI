module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', [
      {subject:'Math',grade:9,required: true},
      {subject:'Math',grade:10,required: true},
      {subject:'Math',grade:11,required: true},
      {subject:'Math',grade:12,required: true},
      {subject:'Calculus',grade:12,required: false},
      {subject:'Computer Science',grade:11,required: false},
      {subject:'Computer Science',grade:12,required: false},
      {subject:'English',grade:9,required: true},
      {subject:'English',grade:10,required: true},
      {subject:'English',grade:11,required: true},
      {subject:'English',grade:12,required: true},
      {subject:'French',grade:9,required: false},
      {subject:'French',grade:10,required: false},
      {subject:'French',grade:11,required: false},
      {subject:'French',grade:12,required: false},
      {subject:'Spanish',grade:9,required: false},
      {subject:'Spanish',grade:10,required: false},
      {subject:'Spanish',grade:11,required: false},
      {subject:'Spanish',grade:12,required: false},
      {subject:'Chemistry',grade:9,required: true},
      {subject:'Chemistry',grade:10,required: false},
      {subject:'Chemistry',grade:11,required: false},
      {subject:'Chemistry',grade:12,required: false},
      {subject:'Physics',grade:9,required: true},
      {subject:'Physics',grade:10,required: false},
      {subject:'Physics',grade:11,required: false},
      {subject:'Physics',grade:12,required: false},
      {subject:'Biology',grade:9,required: true},
      {subject:'Biology',grade:10,required: false},
      {subject:'Biology',grade:11,required: false},
      {subject:'Biology',grade:12,required: false},
      {subject:'History',grade:9,required: true},
      {subject:'History',grade:10,required: true},
      {subject:'History',grade:11,required: false},
      {subject:'History',grade:12,required: false},
      {subject:'Art',grade:10,required: false},
      {subject:'Art',grade:11,required: false},
      {subject:'Art',grade:12,required: false},
      {subject:'Band',grade:9,required: false},
      {subject:'Band',grade:10,required: false},
      {subject:'Band',grade:11,required: false},
      {subject:'Band',grade:12,required: false},
      {subject:'Cooking',grade:10,required: false},
      {subject:'Cooking',grade:11,required: false},
      {subject:'Cooking',grade:12,required: false},
      {subject:'Auto',grade:10,required: false},
      {subject:'Auto',grade:11,required: false},
      {subject:'Auto',grade:12,required: false},
      {subject:'Woodworking',grade:10,required: false},
      {subject:'Woodworking',grade:11,required: false},
      {subject:'Woodworking',grade:12,required: false},
      {subject:'Physical Education',grade:9,required: true},
      {subject:'Physical Education',grade:10,required: false},
      {subject:'Physical Education',grade:11,required: false},
      {subject:'Physical Education',grade:12,required: false},
      {subject:'Planning',grade:12,required: true}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {});
  }
};
