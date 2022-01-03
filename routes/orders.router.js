const express = require('express');
const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getOrderSchema,
        createOrderSchema,
        addItemSchema } = require('./../schemas/order.schema');


const router = express.Router();
const orderService = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await orderService.find();
    console.log(orders);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await orderService.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async(req, res , next) => {
    try{
      const body = req.body;
      const newOrder = await orderService.create(body);
      res.status(201).json(newOrder);

    }catch(error){
      next(error);
    }
  }
);


//OrderProduct Route
router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async(req, res , next) => {
    try{
      const body = req.body;
      const newItem = await orderService.addItem(body);
      res.status(201).json(newItem);

    }catch(error){
      next(error);
    }
  }
);


module.exports = router;
