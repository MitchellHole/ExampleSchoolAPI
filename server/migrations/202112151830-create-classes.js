module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("classes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subject: {
        type: Sequelize.STRING,
        unique: 'fields_unique',
      },
      grade: {
        type: Sequelize.INTEGER,
        unique: 'fields_unique',
      },
      required: {
        type: Sequelize.BOOLEAN,
      }
    }, {
      uniqueKeys: {
          fields_unique: {
              fields: ['subject', 'grade']
          }
      }
  });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("classes");
  }
};
