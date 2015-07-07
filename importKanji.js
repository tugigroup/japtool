var fs = require('fs');
var parse = require('csv-parse');
var parser = parse({delimiter : ','});

var mongoose = require('mongoose');
var config = require('./config.json');

data = fs.readFileSync(config.kanji_csv_file,{"encoding":"utf8"});
//console.log(data);

parse(data, {delimiter : ',', comment: '#'}, function(err, kanjis){

	if (err) {
		console.log('data import error! Data has wrong');
		return;
	}
	
	// check header
	if (kanjis.length == 0){
		console.log('Error! csv file has not any data');
	}

	var header = kanjis[0];
	if (header.length < 10 || 
		header[0] != 'item' ||
		header[1] != 'hanviet' ||
		header[2] != 'kunyomi' ||
		header[3] != 'onyomi' ||
		header[4] != 'description' ||
		header[6] != 'level' ||
		header[7] != 'sort' ||
		header[8] != 'tag' ||
		header[9] != 'category' ){

		console.log('Error! Format of csv file is not correct.');
	}

	// connect to mongodb
	mongoose.connect('mongodb://' + config.dbhost + '/' + config.database);

	var kanjiSchema = mongoose.Schema({
	  item:  			String,
	  hanviet: 			String,
	  kunyomi:   		String,
	  onyomi:   		String,
	  description:   	String,
	  level:   			String,
	  sort:   			Number,
	  tag:   			String,
	  category:   		String
	},{ collection: 'kanji', versionKey: false });

	var kanjiColl = mongoose.model('kanji', kanjiSchema);

	var exampleSchema = mongoose.Schema({
	  exampleSetID:  	mongoose.Schema.Types.ObjectId,
	  example: 			String,
	  meaning:   		String
	},{ collection: 'example', versionKey: false  });

	var exampleColl = mongoose.model('example', exampleSchema);


	var kanji, tmpString, jsonVocab;

	var kanjiInsertCount = 0;
	var exampleInsertCount = 0;

	for ( var i = 1; i < kanjis.length; i++ ) {
		//console.log(vocabularies[i]);

		kanji = kanjis[i];

		// tmpString = "{\"" + header[0] + "\":\"" + vocabulary[0] + "\",\"" +
		// 					header[1] + "\":\"" + vocabulary[1] + "\",\"" +
		// 					header[2] + "\":\"" + vocabulary[2] + "\",\"" +
		// 					header[4] + "\":\"" + vocabulary[4] + "\",\"" +
		// 					header[5] + "\":\"" + vocabulary[5] + "\",\"" +
		// 					header[6] + "\":\"" + vocabulary[6] + "\",\"" +
		// 					header[7] + "\":\"" + vocabulary[7] + "\"}" ;

		// jsonVocab = JSON.parse(tmpString);

		var insertedKanji = new kanjiColl({
			item:  			kanji[0],
			hanviet: 		kanji[1],
			kunyomi: 		kanji[2],
			onyomi:   		kanji[3],
			description:   	kanji[4],
			level:   		kanji[6],
			sort:   		kanji[7],
			tag:   			kanji[8],
			category:   	kanji[9]
		});
		
		insertedKanji.save();
		kanjiInsertCount ++;

		examples = kanji[5].toString().split(config.chars_split_between_examples);
		examples.forEach(function(example) {
			items = example.split(config.chars_split_insite_examples);
			var insertedExample = new exampleColl({ exampleSetID: insertedKanji._id,
													example: items[0],
													meaning: items[1] 
												});

			insertedExample.save();
			exampleInsertCount++;
		});
	};

	console.log('kanji collection: ' + kanjiInsertCount.toString() + ' records was inserted.');
	console.log('example collection: ' + exampleInsertCount.toString() + ' records was inserted.');

	// disconect mongodb
	mongoose.disconnect();
});
