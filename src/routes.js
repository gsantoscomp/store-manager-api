const express = require('express');
const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
const PurchaseController = require('./controllers/PurchaseController');

const routes = express.Router();

routes.get('/users', UserController.index); 
routes.post('/users', UserController.store); 
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.get('/users/:user_id/purchases', PurchaseController.index); 
routes.post('/users/:user_id/purchases', PurchaseController.store); 
routes.get('/users/:user_id/purchases/:id', PurchaseController.show); 
routes.put('/users/:user_id/purchases/:id', PurchaseController.update);
routes.delete('/users/:user_id/purchases/:id', PurchaseController.destroy);

routes.get('/products', ProductController.index); 
routes.post('/products', ProductController.store); 
routes.get('/products/:id', ProductController.show);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);


module.exports = routes;