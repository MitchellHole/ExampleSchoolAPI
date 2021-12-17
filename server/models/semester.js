const semesterModel = (sequelize, DataTypes) => {
  const Semester = sequelize.define(
    'semesters',
    {
      year: DataTypes.INTEGER,
      term: DataTypes.INTEGER
    },
    {timestamps: false},
  );
  Semester.associate = function (models) {
    // associations can be defined here
    Semester.hasOne(models.class_offerings, {foreignKey: 'id'})
  };
  Semester.removeAttribute('createdAt');
  Semester.removeAttribute('updatedAt');
  return Semester;
};

export default semesterModel;
