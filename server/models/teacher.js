const teacherModel = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    'teachers',
    {
      name: DataTypes.STRING,
      subject: DataTypes.STRING,
      started_at: DataTypes.DATE,
    },
    {timestamps: false},
  );
  Teacher.associate = function (models) {
    // associations can be defined here
    Teacher.hasOne(models.class_offerings, {foreignKey: 'id'})
  };
  Teacher.removeAttribute('createdAt');
  Teacher.removeAttribute('updatedAt');
  return Teacher;
};

export default teacherModel;
