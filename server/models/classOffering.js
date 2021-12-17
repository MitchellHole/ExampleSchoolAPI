const classOfferingModel = (sequelize, DataTypes) => {
  const ClassOffering = sequelize.define(
    'class_offerings',
    {
      semester_id: {
       type: DataTypes.INTEGER,
       references: {
          model: 'semester', // 'fathers' refers to table name
          key: 'id', // 'id' refers to column name in fathers table
       }
     },
      teacher_id: {
       type: DataTypes.INTEGER,
       references: {
          model: 'teacher', // 'fathers' refers to table name
          key: 'id', // 'id' refers to column name in fathers table
       }
     },
      class_id: {
       type: DataTypes.INTEGER,
       references: {
          model: 'classes', // 'fathers' refers to table name
          key: 'id', // 'id' refers to column name in fathers table
       }
     }
    },
    {timestamps: false},
  );
  ClassOffering.associate = function (models) {
    // associations can be defined here
    ClassOffering.belongsTo(models.semesters, {foreignKey: 'semester_id'})
    ClassOffering.belongsTo(models.teachers, {foreignKey: 'teacher_id'})
    ClassOffering.belongsTo(models.classes, {foreignKey: 'class_id'})
    ClassOffering.hasMany(models.class_takings, {foreignKey: 'id'})

  };
  ClassOffering.removeAttribute('createdAt');
  ClassOffering.removeAttribute('updatedAt');
  return ClassOffering;
};

export default classOfferingModel;
