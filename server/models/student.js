const studentModel = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'students',
    {
      name: DataTypes.STRING,
      grade: DataTypes.INTEGER,
      student_number: DataTypes.STRING,
      is_graduated: DataTypes.BOOLEAN,
    },
    {timestamps: false},
  );
  Student.associate = function (models) {
    // associations can be defined here
    Student.hasMany(models.class_takings, {foreignKey: 'id'})

  };
  Student.removeAttribute('createdAt');
  Student.removeAttribute('updatedAt');
  return Student;
};

export default studentModel;
