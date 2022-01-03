const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');


class CustomerService {
  constructor(){

  }

  async find(){
    const rta = await models.Customer.findAll({
      include: ['user'], //Asociación, belongsto
    });
    return rta;
  }

  async findOne(id){
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async create(data){
    const hash = await bcrypt.hash(data.user.password, 10); //Encriptado
    const newData = {
      ...data,
      user:{
        ...data.user,
        password: hash
      }
    }

    const newCustomer = await models.Customer.create( newData, {
      include: ['user']
    });

    delete newCustomer.dataValues.user.dataValues.password; //Eliminado de la propiedad password el objeto a retornar

    return newCustomer;
  }

  async update(id, changes){
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id){
    const customer = await this.findOne(id);
    await customer.destroy();
    return { rta: true}
  }

}

module.exports = CustomerService;
