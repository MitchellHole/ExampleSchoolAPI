module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("class_takings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.INTEGER,
        unique: 'fields_unique',
      },
      class_offering_id: {
        type: Sequelize.INTEGER,
        unique: 'fields_unique',
      },
      grade: {
        type: Sequelize.STRING
      }
    }, {
      uniqueKeys: {
          fields_unique: {
              fields: ['student_id', 'class_offering_id']
          }
      }
  }).then( () => queryInterface.addConstraint('class_takings', {
      fields: ['student_id'],
      type: 'foreign key',
      name: 'student_fkey_constraint_name', // optional
      references: {
        table: 'students',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  ))
  .then( () => queryInterface.addConstraint('class_takings', {
      fields: ['class_offering_id'],
      type: 'foreign key',
      name: 'class_offering_fkey_constraint_name', // optional
      references: {
        table: 'class_offerings',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  ))
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("class_takings");
  }
};
