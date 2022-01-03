const { DataTypes, Model, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: { //Relación 1 a muchos con la tabla 'CUSTOMER'
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { //Relacionar a la otra tabla(Customer)
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },

  total: { //Este método de calculo de datos NO es recomendable cuando son muchos registros, es mejor hacer el cálculo mediante una consulta a la BD directamente.
    type: DataTypes.VIRTUAL,
    get(){
      if(this.items && this.items.length > 0){ //this.items  es el nombre que se le pone en el método static associate as: 'items'
        return this.items.reduce((total, item)=>{
          return total + (item.price * item.OrderProduct.amount);
        },0);
      }
      return 0;
    }
  },
}

class Order extends Model{
  static associate(models){

    this.belongsTo(models.Customer, { //Relación 1 a muchos
      as: 'customer',
    });

    this.belongsToMany(models.Product, { //Relación muchos a muchos => La tabla ternaria es 'OrderProduct'
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}


module.exports = { Order, OrderSchema, ORDER_TABLE };
