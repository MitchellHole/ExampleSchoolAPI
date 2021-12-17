module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("class_offerings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      semester_id: {
        type: Sequelize.INTEGER,
        unique: 'fields_unique',
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        unique: 'fields_unique',
      },
      class_id: {
        type: Sequelize.INTEGER,
        unique: 'fields_unique',
      }
    }, {
      uniqueKeys: {
          fields_unique: {
              fields: ['semester_id', 'teacher_id', 'class_id']
          }
      }
  }).then( () => queryInterface.addConstraint('class_offerings', {
      fields: ['semester_id'],
      type: 'foreign key',
      name: 'semester_fkey_constraint_name', // optional
      references: {
        table: 'semesters',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  ))
  .then( () => queryInterface.addConstraint('class_offerings', {
      fields: ['teacher_id'],
      type: 'foreign key',
      name: 'teacher_fkey_constraint_name', // optional
      references: {
        table: 'teachers',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  ))
  .then( () => queryInterface.addConstraint('class_offerings', {
      fields: ['class_id'],
      type: 'foreign key',
      name: 'class_fkey_constraint_name', // optional
      references: {
        table: 'classes',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  ));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("class_offerings");
  }
};
