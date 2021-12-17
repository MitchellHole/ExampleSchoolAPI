const classTakingModel = (sequelize, DataTypes) => {
  const ClassTaking = sequelize.define(
    'class_takings',
    {
      student_id: {
       type: DataTypes.INTEGER,
       references: {
          model: 'student', // 'fathers' refers to table name
          key: 'id', // 'id' refers to column name in fathers table
       }
     },
      class_offering_id: {
       type: DataTypes.INTEGER,
       references: {
          model: 'classOffering', // 'fathers' refers to table name
          key: 'id', // 'id' refers to column name in fathers table
       }
     },
     grade: DataTypes.STRING

    },
    {timestamps: false},
  );
  ClassTaking.associate = function (models) {
    // associations can be defined here
    ClassTaking.belongsTo(models.students, {foreignKey: 'student_id'})
    ClassTaking.belongsTo(models.class_offerings, {foreignKey: 'class_offering_id'})

  };
  ClassTaking.removeAttribute('createdAt');
  ClassTaking.removeAttribute('updatedAt');
  return ClassTaking;
};

export default classTakingModel;
