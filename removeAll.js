var mongoose = require('mongoose');
var async = require('async');
var config = require('./config.json');

// connect to mongodb
mongoose.connect('mongodb://' + config.dbhost + '/' + config.database);

console.log('START: REMOVING DOCUMENTS...');
console.log('========================');	
async.series([
	function(callback){
		// example collection
		var exampleSchema = mongoose.Schema({
			},{ collection: 'example', versionKey: false });

		var example = mongoose.model('example', exampleSchema);

		example.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'example was removed all documents.')
			}
		});
	},
	function(callback){
		// Vocabulary collection
		var exampleSchema = mongoose.Schema({
			},{ collection: 'vocabulary', versionKey: false });

		var example = mongoose.model('vocabulary', exampleSchema);

		example.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'vocabulary was removed all documents.')
			}
		});
	},
	function(callback){
		// kanji collection
		var exampleSchema = mongoose.Schema({
			},{ collection: 'kanji', versionKey: false });

		var example = mongoose.model('kanji', exampleSchema);

		example.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'kanji was removed all documents.')
			}
		});
	},
	function(callback){
		// grammar collection
		var exampleSchema = mongoose.Schema({
			},{ collection: 'grammar', versionKey: false });

		var example = mongoose.model('grammar', exampleSchema);

		example.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'grammar was removed all documents.')
			}
		});
	},
	function(callback){
		// question collection
		var exampleSchema = mongoose.Schema({
			},{ collection: 'question', versionKey: false });

		var example = mongoose.model('question', exampleSchema);

		example.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'question was removed all documents.')
			}
		});
	},
	function(callback){
		// article collection
		var exampleSchema = mongoose.Schema({
			},{ collection: 'article', versionKey: false });

		var example = mongoose.model('article', exampleSchema);

		example.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'article was removed all documents.')
			}
		});
	},
	function(callback){
		// bookDetail collection
		var exampleSchema = mongoose.Schema({
			},{ collection: 'bookdetail', versionKey: false });

		var example = mongoose.model('bookdetail', exampleSchema);

		example.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'bookdetail was removed all documents.')
			}
		});
	},
	function(callback){
		// bookMaster collection
		var exampleSchema = mongoose.Schema({
			},{ collection: 'bookmaster', versionKey: false });

		var example = mongoose.model('bookmaster', exampleSchema);

		example.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'bookmaster was removed all documents.')
			}
		});
	},
	],
	// optional callback
	function(err, results){
		if(err) {
 			console.log(err);
		}else {
			// disconect mongodb
	    	mongoose.disconnect();
	    	console.log(results[0].toString());
			console.log(results[1].toString());
			console.log(results[2].toString());
			console.log(results[3].toString());
			console.log(results[4].toString());
			console.log(results[5].toString());
			console.log(results[6].toString());
			console.log(results[7].toString());
			console.log('========================');
			console.log('END: REMOVED DOCUMENTS');		
		}
	});