const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

const Dishes = require('../models/dishes');

dishRouter.route('/')
.get((req,res,next) => {
	console.log('Will get all the dishes to you!');
	Dishes.find({})
	.then( (dishes) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(dishes);
	} , (err) => next(err))
	.catch( (err) => next(err) );
})
.post((req,res,next) => {
	console.log('Will add the dish :' + req.body.name + ' with details :'+req.body.description);
	Dishes.create(req.body)
	.then( (dish) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(dish);
	} , (err) => next(err))
	.catch( (err) => next(err) );
})
.put((req,res,next) => {
	res.statusCode = 403;
	res.end('PUT operation not supported on dishes!');
})
.delete((req,res,next) => {
	console.log('Deleting all the dishes !!!! ');
	Dishes.remove({})
	.then( (resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	} , (err) => next(err))
	.catch( (err) => next(err) );
});
dishRouter.route('/:dishId')
.get((req,res,next) => {
	console.log('Will send the dish : '+req.params.dishId + ' to you!');
	Dishes.findById(req.params.dishId)
	.then( (dish) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(dish);
	} , (err) => next(err))
	.catch( (err) => next(err) );
})
.post((req,res,next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on dish : '+req.params.dishId);
})
.put((req,res,next) => {
	console.log('Updating dish with Id : '+req.params.dishId);
	console.log('Will update the dish: '+req.body.name + ' with details: '+req.body.description);
	Dishes.findByIdAndUpdate(req.params.dishId , {$set : req.body}, {new : true})
	.then( (dish) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(dish);
	} , (err) => next(err))
	.catch( (err) => next(err) );
})
.delete((req,res,next) => {
	console.log('Deleting dish: '+req.params.dishId);
	Dishes.findByIdAndRemove(req.params.dishId)
	.then( (dish) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(dish);
	} , (err) => next(err))
	.catch( (err) => next(err) );
});
module.exports = dishRouter;