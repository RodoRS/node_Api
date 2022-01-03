/*
Se encarga de hacer el mapeo de datos para la base de datos
 */

const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users'; //Nombre de tabla 'users'

/*
  - Esquema(estructura) define la estructura que se crea en la base de datos
  - Es diferente a los schema que validan la información con Joi
*/
 const UserSchema ={
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  email:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  }

}

class User extends Model{
  //static : No se necesita una declaración del objeto para acceder al método
  static associate(models){
    //Asociación a la tabla de Customer
    this.hasOne(models.Customer,{ //Relación 1-1
      as: 'customer',
      foreignKey: 'userId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: async (user, options) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
      }
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User };
