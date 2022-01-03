const { DataTypes, Model, Sequelize } = require('sequelize');

//Tabla a relacionar
const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
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
  description: {
    type: DataTypes.STRING,
    alloNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
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

  categoryId: {// Relación 1 a muchos con la tabla 'CATEGORY',  Agregar propiedad de asociación con User
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { //Relacionar a la otra tabla(User)
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}

class Product extends Model{
  static associate(models){
    this.belongsTo(models.Category, { as: 'category' }); //Relación con Category
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    }
  }
}


module.exports = { Product, ProductSchema, PRODUCT_TABLE };
