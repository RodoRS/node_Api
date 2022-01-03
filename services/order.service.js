//const boom = require('@hapi/boom');
//const pool = require('./../libs/postgres.pool');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId   //Consulta por Asociación
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
      ]
    });
    return orders;
  }

  async findOne(id) { //Asociación con las tablas customer > user y OrderProduct (order,product)
    const order = await models.Order.findByPk(id, {
      include: [
        {
        association: 'customer',
        include: ['user']
        },
        'items'
      ]
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }


  //Tabla OrderProduct

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

}

module.exports = OrderService;
