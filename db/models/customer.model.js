const { DataTypes, Model, Sequelize } = require('sequelize');

//Tabla a relacionar
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customer';


const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },

  userId: {// Relación => 1-1, la propiedad unique lo permite; Agregar propiedad de asociación con User,
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: { //Relacioanr a la otra tabla(User)
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }

};

class Customer extends Model{
  static associate(models){ //La llave foreanea debe de estar en esta tabla, en la bd
    this.belongsTo(models.User, { as: 'user'}); //Relación 1-1 con la tabla 'User'
    this.hasMany(models.Order,{ //Relación 1 a muchos con la tabla  'Orders'
      as: 'orders',
      foreignKey: 'customerId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,

    }
  }
}


module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
