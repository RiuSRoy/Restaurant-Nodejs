const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

const Promotions = require('../models/promotions');


promoRouter.route('/')
.get((req,res,next) => {
	console.log('Will get all the promotions to you!');
	Promotions.find({})
	.then( (promotions) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(promotions);
	})
	.catch( (err ) => next(err) );
})
.post((req,res,next) => {
	console.log('Will add the promotion :' + req.body.name + ' with details :'+req.body.description);
	Promotions.create(req.body)
	.then( (promotion) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(promotion);
	})
	.catch ((err) => next(err));
})
.put((req,res,next) => {
	res.statusCode = 403;
	res.end('PUT operation not supported on promotions!');
})
.delete((req,res,next) => {
	console.log('Deleting all the promtions !!!! ');
	Promotions.remove({})
	.then( (resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	} , (err) => next(err))
	.catch( (err) => next(err) );
});
promoRouter.route('/:promoId')
.get((req,res,next) => {
	console.log('Will send the promtion : '+req.params.promoId + ' to you!');
	Promotions.findById(req.params.promoId)
	.then( (promotion) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(promotion);
	} , (err) => next(err))
	.catch( (err) => next(err) );})
.post((req,res,next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on promotion : '+promoId);
})
.put((req,res,next) => {
	Promotions.findByIdAndUpdate(req.params.promoId , {$set : req.body}, {new : true})
	.then( (promotion) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(promotion);
	} , (err) => next(err))
	.catch( (err) => next(err) );
})
.delete((req,res,next) => {
	console.log('Deleting dish: '+req.params.promoId);
	Promotions.findByIdAndRemove(req.params.promoId)
	.then( (promotion) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(promotion);
	} , (err) => next(err))
	.catch( (err) => next(err) );
});
module.exports = promoRouter;
