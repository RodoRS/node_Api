const express = require('express');

const CustomerService = require('./../services/customer.service');
const validatorHandler = require('./../middlewares/validator.handler')

const { getCustomerSchema, createCustomerSchema, updateCustomerSchema } = require('./../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async(req, res, next)=>{
  try{
    res.json(await service.find());
  }catch(error){
    next(error);
  }
});

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async(req, res, next) => {
    try{
      const body = req.body;
      res.status(201).json(await service.create(body));
    }catch(error){
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async(req, res, next ) => {
    try{
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    }catch(error){
      next(error);
    }
  }
);

  router.delete('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
      try{
        const { id } = req.params;
        res.status(200).json(await service.delete(id));
      }catch(error){
        next(error);
      }
    }
  );

module.exports = router;
