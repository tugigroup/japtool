var fs = require('fs');
var parse = require('csv-parse');
var parser = parse({delimiter : ','});

var mongoose = require('mongoose');
var config = require('./config.json');

data = fs.readFileSync(config.vocabulary_csv_file,{"encoding":"utf8"});
//console.log(data);

parse(data, {delimiter : ',', comment: '#'}, function(err, vocabularies){

	if (err) {
		console.log('data import error! Data has wrong');
		return;
	}
	
	// check header
	if (vocabularies.length == 0){
		console.log('Error! csv file has not any data');
	}

	var header = vocabularies[0];
	if (header.length < 8 || 
		header[0] != 'item' ||
		header[1] != 'reading' ||
		header[2] != 'description' ||
		header[3] != 'example' ||
		header[4] != 'level' ||
		header[5] != 'sort' ||
		header[6] != 'tag' ||
		header[7] != 'category' ){

		console.log('Error! Format of csv file is not correct.');
	}

	// connect to mongodb
	mongoose.connect('mongodb://' + config.dbhost + '/' + config.database);

	var vocabularySchema = mongoose.Schema({
	  item:  String,
	  reading: String,
	  description:   String,
	  level:   String,
	  sort:   Number,
	  tag:   String,
	  category:   String
	},{ collection: 'vocabulary', versionKey: false });

	var vocabularyColl = mongoose.model('vocabulary', vocabularySchema);

	var exampleSchema = mongoose.Schema({
	  exampleSetID:  mongoose.Schema.Types.ObjectId,
	  example: String,
	  meaning:   String
	},{ collection: 'example', versionKey: false  });

	var exampleColl = mongoose.model('example', exampleSchema);


	var vocabulary, tmpString, jsonVocab;

	var vocabInsertCount = 0;
	var exampleInsertCount = 0;

	for ( var i = 1; i < vocabularies.length; i++ ) {
		//console.log(vocabularies[i]);

		vocabulary = vocabularies[i];

		// tmpString = "{\"" + header[0] + "\":\"" + vocabulary[0] + "\",\"" +
		// 					header[1] + "\":\"" + vocabulary[1] + "\",\"" +
		// 					header[2] + "\":\"" + vocabulary[2] + "\",\"" +
		// 					header[4] + "\":\"" + vocabulary[4] + "\",\"" +
		// 					header[5] + "\":\"" + vocabulary[5] + "\",\"" +
		// 					header[6] + "\":\"" + vocabulary[6] + "\",\"" +
		// 					header[7] + "\":\"" + vocabulary[7] + "\"}" ;

		// jsonVocab = JSON.parse(tmpString);

		var insertedVocab = new vocabularyColl({
			item:  		vocabulary[0],
			reading: 	vocabulary[1],
			description:vocabulary[2],
			level:   	vocabulary[4],
			sort:   	vocabulary[5],
			tag:   		vocabulary[6],
			category:   vocabulary[7]
		});
		
		insertedVocab.save();
		vocabInsertCount ++;

		examples = vocabulary[3].toString().split(config.chars_split_between_examples);
		examples.forEach(function(example) {
			items = example.split(config.chars_split_insite_examples);
			var insertedExample = new exampleColl({ exampleSetID: insertedVocab._id,
													example: items[0],
													meaning: items[1] 
												});

			insertedExample.save();
			exampleInsertCount++;
		});
	};

	console.log('vocabulary collection: ' + vocabInsertCount.toString() + ' records was inserted.');
	console.log('example collection: ' + exampleInsertCount.toString() + ' records was inserted.');

	// disconect mongodb
	mongoose.disconnect();
});
