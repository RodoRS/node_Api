/* DESCRIPCIÓN
  Relación muchos a muchos;
  Es necesario que una orden pueda tener muchos productos y
  que muchos productos puedan pertenecer a una orden, esto se
  soluciona con tablas ternarias, como la siguiente.
*/

const { DataTypes, Model, Sequelize } = require('sequelize');

//Tablas a relacionar
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'orders_products';

//Tabla

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },

  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  orderId: {//Relación con la tabla 'Order'
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },

  productId: {// Relación con la tabla 'Product'
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }

};

class OrderProduct extends Model{
  static associate(){ //La llave foreanea debe de estar en esta tabla, en la bd

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,

    }
  }
}


module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE };
