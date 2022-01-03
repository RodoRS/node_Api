const { DataTypes, Model, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'category';

const CategorySchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}

class Category extends Model{
  static associate(models){

    this.hasMany(models.Product, { //Relación 1 a muchos
      as: 'products',
      foreignKey: 'categoryId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}


module.exports = { Category, CategorySchema, CATEGORY_TABLE };
