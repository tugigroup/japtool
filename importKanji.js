var fs = require('fs');
var async = require('async');
var parse = require('csv-parse');
var parser = parse({delimiter : ','});

var mongoose = require('mongoose');
var config = require('./config.json');

data = fs.readFileSync(config.kanji_csv_file,{"encoding":"utf8"});
//console.log(data);

var kanjiSchema = mongoose.Schema({
	item:  			String,
	hanviet: 		String,
	kunyomi:   		String,
	onyomi:   		String,
	description:   	String,
	level:   		String,
	sort:   		Number,
	tag:   			String,
	category:   	String
	},{ collection: 'kanji', versionKey: false });

var kanjiColl = mongoose.model('kanji', kanjiSchema);

var exampleSchema = mongoose.Schema({
	kanji:  	mongoose.Schema.Types.ObjectId,
	example: 		String,
	meaning:   		String
},{ collection: 'example', versionKey: false  });

var exampleColl = mongoose.model('example', exampleSchema);

parse(data, {delimiter : ',', comment: '#'}, function(err, kanjis){

	if (err) {
		console.log('data import error! Data has wrong');
		return;
	}
	
	// check header
	if (kanjis.length == 0){
		console.log('Error! csv file has not any data');
		return;
	}

	var header = kanjis[0];
	if (header.length < 10 ){
		// header[0] != 'item' ||
		// header[1] != 'hanviet' ||
		// header[2] != 'kunyomi' ||
		// header[3] != 'onyomi' ||
		// header[4] != 'description' ||
		// header[6] != 'level' ||
		// header[7] != 'sort' ||
		// header[8] != 'tag' ||
		// header[9] != 'category' 
	
		console.log('Error! Format of csv file is not correct.');
		return;
	}

    var example_array = [];
    var kanjiInsertCount = 0;
	var exampleInsertCount = 0;
	// connect to mongodb
	mongoose.connect('mongodb://' + config.dbhost + '/' + config.database);
	console.log('START: IMPORTING DATA...');
	console.log('========================');
	async.series([
		function(callback){
			//console.log(kanji_array[0]);
			kanjis.forEach(function(item) {
				var insertedKanji = new kanjiColl({
					item:  			item[0],
					hanviet: 		item[1],
					kunyomi: 		item[2],
					onyomi:   		item[3],
					description:   	item[4],
					level:   		item[6],
					sort:   		item[7],
					tag:   			item[8],
					category:   	item[9]
				});

				insertedKanji.save(function (err,data) {
			        if(err) {
			            callback(err);
			        }else {
			        	example_array.push({id: data._id, exampleStr: item[5]});
			        	kanjiInsertCount ++;
			        	if(kanjiInsertCount == kanjis.length){
			        		callback(null, kanjiInsertCount);
			        	}
			        }
		    	});
			});
	    },
	    function(callback){
	    	var insertedCount = 0;
			//console.log(example_array.length)
			example_array.forEach(function(item) {
				var examples = [];
				examples = item.exampleStr.toString().split(config.chars_split_between_examples);
				var count = 0;
				examples.forEach(function(example) {
					if (example.trim() == ""){
						insertedCount++;
					}else {
						var items = [];
						items = example.split(config.chars_split_insite_examples);
						var insertedExample = new exampleColl({ kanji: item.id,
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
	    	console.log('kanji collection: ' + results[0].toString() + ' records was inserted.');
			console.log('example collection: ' + results[1].toString() + ' records was inserted.');
			console.log('========================');
			console.log('END: IMPORTED DATA');		
		}
		// disconect mongodb
	    mongoose.disconnect();
	});
});