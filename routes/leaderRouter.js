const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next) => {
	console.log('Will get all the leaders to you!');
	Leaders.find({})
	.then( (leaders) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(leaders);
	})
	.catch( (err ) => next(err) );
})
.post((req,res,next) => {
	console.log('Will add the leader :' + req.body.name + ' with details :'+req.body.description);
	Leaders.create(req.body)
	.then( (leader) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(leader);
	})
	.catch ((err) => next(err));
})
.put((req,res,next) => {
	res.statusCode = 403;
	res.end('PUT operation not supported on leaders!');
})
.delete((req,res,next) => {
	console.log('Deleting all the leaders !!!! ');
	Leaders.remove({})
	.then( (resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	} , (err) => next(err))
	.catch( (err) => next(err) );
});
leaderRouter.route('/:leaderId')
.get((req,res,next) => {
	console.log('Will send the leader : '+req.params.leaderId + ' to you!');
	Leaders.findById(req.params.leaderId)
	.then( (leader) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(leader);
	} , (err) => next(err))
	.catch( (err) => next(err) );})
.post((req,res,next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on leader : '+leaderId);
})
.put((req,res,next) => {
	Leaders.findByIdAndUpdate(req.params.leaderId , {$set : req.body}, {new : true})
	.then( (leader) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(leader);
	} , (err) => next(err))
	.catch( (err) => next(err) );
})
.delete((req,res,next) => {
	console.log('Deleting leader: '+req.params.leaderId);
	Leaders.findByIdAndRemove(req.params.leaderId)
	.then( (leader) => {
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json(leader);
	} , (err) => next(err))
	.catch( (err) => next(err) );
});
module.exports = leaderRouter;
