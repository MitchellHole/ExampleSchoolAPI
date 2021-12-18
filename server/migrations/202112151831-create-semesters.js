module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("semesters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER,
        unique: 'fields_unique',
      },
      term: {
        type: Sequelize.INTEGER,
        unique: 'fields_unique',
      },
      finalized: {
        type: Sequelize.BOOLEAN
      }
    }, {
      uniqueKeys: {
          fields_unique: {
              fields: ['year', 'term']
          }
      }
  });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("semesters");
  }
};
