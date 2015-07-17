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
		var vocabularySchema = mongoose.Schema({
			},{ collection: 'vocabulary', versionKey: false });

		var vocabulary = mongoose.model('vocabulary', vocabularySchema);

		vocabulary.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'vocabulary was removed all documents.')
			}
		});
	},
	function(callback){
		// kanji collection
		var kanjiSchema = mongoose.Schema({
			},{ collection: 'kanji', versionKey: false });

		var kanji = mongoose.model('kanji', kanjiSchema);

		kanji.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'kanji was removed all documents.')
			}
		});
	},
	function(callback){
		// grammar collection
		var grammarSchema = mongoose.Schema({
			},{ collection: 'grammar', versionKey: false });

		var grammar = mongoose.model('grammar', grammarSchema);

		grammar.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'grammar was removed all documents.')
			}
		});
	},
	function(callback){
		// question collection
		var questionSchema = mongoose.Schema({
			},{ collection: 'question', versionKey: false });

		var question = mongoose.model('question', questionSchema);

		question.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'question was removed all documents.')
			}
		});
	},
	function(callback){
		// article collection
		var articleSchema = mongoose.Schema({
			},{ collection: 'article', versionKey: false });

		var article = mongoose.model('article', articleSchema);

		article.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'article was removed all documents.')
			}
		});
	},
	function(callback){
		// bookDetail collection
		var bookdetailSchema = mongoose.Schema({
			},{ collection: 'bookdetail', versionKey: false });

		var bookdetail = mongoose.model('bookdetail', bookdetailSchema);

		bookdetail.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'bookdetail was removed all documents.')
			}
		});
	},
	function(callback){
		// bookMaster collection
		var bookmasterSchema = mongoose.Schema({
			},{ collection: 'bookmaster', versionKey: false });

		var bookmaster = mongoose.model('bookmaster', bookmasterSchema);

		bookmaster.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'bookmaster was removed all documents.')
			}
		});
	},
	function(callback){
		// survey collection
		var surveySchema = mongoose.Schema({
			},{ collection: 'survey', versionKey: false });

		var survey = mongoose.model('survey', surveySchema);

		survey.remove({}, function (err) {
			if (err) {
				callback(err)
			}else {
				callback(null,'survey was removed all documents.')
			}
		});
	}
	],
	// optional callback
	function(err, results){
		if(err) {
 			console.log(err);
		}else {
	    	console.log(results[0].toString());
			console.log(results[1].toString());
			console.log(results[2].toString());
			console.log(results[3].toString());
			console.log(results[4].toString());
			console.log(results[5].toString());
			console.log(results[6].toString());
			console.log(results[7].toString());
			console.log(results[8].toString());
			console.log('========================');
			console.log('END: REMOVED DOCUMENTS');		
		}
		// disconect mongodb
	    mongoose.disconnect();
	});