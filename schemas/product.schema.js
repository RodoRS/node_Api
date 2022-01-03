const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
//Parámetro de tabla relacionada
const categoryId = Joi.number().integer();

//Parámetros Opcionales de filtrado
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();


//Requisitos para Crear el Producto
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

//Requisitos para Actualizar el Producto
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId,
});

//Requisitos para obtener el Producto
const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({ //Parametros opcionales de tipo query
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min',{ //Requiere el precio mínimo para usar el máximo
    is: Joi.number().integer().required(),
    then: Joi.required()
  }),

});


module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
