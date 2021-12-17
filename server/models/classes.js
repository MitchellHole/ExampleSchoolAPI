const classModel = (sequelize, DataTypes) => {
  const Classes = sequelize.define(
    'classes',
    {
      subject: DataTypes.STRING,
      grade: DataTypes.INTEGER
    },
    {timestamps: false},
  );
  Classes.associate = function (models) {
    // associations can be defined here
    Classes.hasOne(models.class_offerings, {foreignKey: 'id'})
  };
  Classes.removeAttribute('createdAt');
  Classes.removeAttribute('updatedAt');
  return Classes;
};

export default classModel;
