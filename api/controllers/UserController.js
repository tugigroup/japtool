/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function(red,res){
       	res.send('<h1>Some text</h1>');
	},
		
	// select all user
	findAll: function(req,res){
		User.find({}).exec(function(err,users){
			if(err){
				console.log('Found User with name ' + users.pop().name)
			}else{
				res.send(users)
			}
		});
	},
	
	// create user
	create: function(req,res){
		User.create({username:'dulv'}).exec(function(err,created){
			res.send(created)
		});
	},
	
	// upload file
	uploadFile: function (req, res) {
		req.file('file').upload({
			adapter: require('skipper-gridfs'),
			uri: 'mongodb://taitt:taitt@52.68.197.24:27017/taitt.file'
		}, function (err, filesUploaded) {
			if (err) return res.send(err);
				return res.send(filesUploaded.id);
		});
	},
  
	// view uploaded file(image)
	viewfile: function(req,res) {
		var dbAdapter = require('skipper-gridfs')({uri:'mongodb://taitt:taitt@52.68.197.24:27017/taitt.file'});
		File.findDB().exec(function(err,results){
			res.send(results)
		});
		//dbAdapter.read("bee43805-77ca-47c6-977b-ab21652d2a66.jpg", function(err,results){
		//	res.contentType('image/png');
        //    res.send(new Buffer(results));
		//});
	}
	
};

