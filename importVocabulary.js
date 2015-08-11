var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
var parser = parse({delimiter : ','});

var mongoose = require('mongoose');
var config = require('./config.json');

data = fs.readFileSync(config.vocabulary_csv_file,{"encoding":"utf8"});
//console.log(data);

var vocabularySchema = mongoose.Schema({
  item:  			String,
  reading: 			String,
  description:   	String,
  level:   			String,
  sort:   			Number,
  tag:   			String,
  category:   		String
},{ collection: 'vocabulary', versionKey: false });

var vocabularyColl = mongoose.model('vocabulary', vocabularySchema);

var exampleSchema = mongoose.Schema({
  vocabulary:  	mongoose.Schema.Types.ObjectId,
  example: 			String,
  meaning:   		String
},{ collection: 'example', versionKey: false  });

var exampleColl = mongoose.model('example', exampleSchema);

parse(data, {delimiter : ',', comment: '#'}, function(err, vocabularies){

	if (err) {
		console.log('data import error! Data has wrong');
		return;
	}
	
	//check header
	if (vocabularies.length == 0){
		console.log('Error! csv file has not any data');
		return;
	}

	var header = vocabularies[0];
	if (header.length < 8){
		// header[0] != 'item' ||
		// header[1] != 'reading' ||
		// header[2] != 'description' ||
		// header[3] != 'example' ||
		// header[4] != 'level' ||
		// header[5] != 'sort' ||
		// header[6] != 'tag' ||
		// header[7] != 'category' 
	
		console.log('Error! Format of csv file is not correct.');
		return;
	}

	var example_array = [];
    var vocabularyInsertCount = 0;
	var exampleInsertCount = 0;
	// connect to mongodb
	mongoose.connect('mongodb://' + config.dbhost + '/' + config.database);
	console.log('START: IMPORTING DATA...');
	console.log('========================');
	async.series([
		function(callback){
			//console.log(kanji_array[0]);
			vocabularies.forEach(function(item) {
				var insertedVocab = new vocabularyColl({
					item:  			item[0],
					reading: 		item[1],
					description:    item[2],
					level:   		item[4],
					sort:   		item[5],
					tag:   			item[6],
					category:   	item[7]
				});

				insertedVocab.save(function (err,data) {
			        if(err) {
			            callback(err);
			        }else {
			        	example_array.push({id: data._id, exampleStr: item[3]});
			        	vocabularyInsertCount ++;
			        	if(vocabularyInsertCount == vocabularies.length){
			        		callback(null, vocabularyInsertCount);
			        	}
			        }
		    	});
			});
	    },
	    function(callback){
	    	var insertedCount = 0;
			example_array.forEach(function(item) {
				var examples = [];
				examples = item.exampleStr.toString().split(config.chars_split_between_examples);
				var count = 0;
				examples.forEach(function(example) {
					if (example.trim() == ""){
						insertedCount++;
						if (insertedCount == example_array.length){
						    callback(null, exampleInsertCount);
						}
					}else {
						var items = [];
						items = example.split(config.chars_split_insite_examples);
						var insertedExample = new exampleColl({ vocabulary: item.id,
													example: items[0],
													meaning: items[1] 
													});
						insertedExample.save(function (err,data) {
						    if(err) {
						        callback(err);
						    }else {
						    	exampleInsertCount++;
						    	count ++;
						    	if (count == examples.length){
						    		insertedCount++;
						    	}
						    	if (insertedCount == example_array.length){
						    		callback(null, exampleInsertCount);
						    	}
						    }
						});
					}
				});
			});
	    }
	],
	// optional callback
	function(err, results){
		if(err) {
 			console.log(err);
		}else {
	    	console.log('vocabulary collection: ' + results[0].toString() + ' records was inserted.');
			console.log('example collection: ' + results[1].toString() + ' records was inserted.');
			console.log('========================');
			console.log('END: IMPORTED DATA');		
		}
		// disconect mongodb
	    mongoose.disconnect();
	});
});
