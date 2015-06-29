var fs = require('fs');
var parse = require('csv-parse');
var parser = parse({delimiter : ','});

var mongoose = require('mongoose');
var config = require('./config.json');

data = fs.readFileSync(config.article_csv_file,{"encoding":"utf8"});
//console.log(data);

parse(data, {delimiter : ',', comment: '#'}, function(err, lessions){

	// check header
	if (lessions.length == 0){
		console.log('Error! csv file has not any data.');
	}

	var header = lessions[0];
	if (header.length < 13 || 
		header[0] != 'name' ||
		header[1] != 'description' ||
		header[2] != 'type' ||
		header[3] != 'level' ||
		header[4] != 'lessionNum' ||
		header[5] != 'hoursForLearn' ||
		header[6] != 'usedNum' ||
		header[7] != 'recommendNum' ||
		header[8] != 'lession' ||
		header[9] != 'subLession' ||
		header[10] != 'useModule' ||
		header[11] != 'useCollection' ||
		header[12] != 'dataExtractCondition' ){

		console.log('Error! Format of csv file is not correct.');
	}

	// connect to mongodb
	mongoose.connect('mongodb://' + config.dbhost + '/' + config.database);

	var bookMasterSchema = mongoose.Schema({
	  name:  String,
	  description: String,
	  type:   String,
	  level:   String,
	  lessionNum:   Number,
	  hoursForLearn:   Number,
	  usedNum: Number,
	  recommendNum:   Number
	},{ collection: 'bookMaster', versionKey: false });

	var bookMasterColl = mongoose.model('bookMaster', bookMasterSchema);

	var bookDetailSchema = mongoose.Schema({
	  bookID:  mongoose.Schema.Types.ObjectId,
	  lession: String,
	  subLession: String,
	  useModule: String,
	  useCollection: String,
	  dataExtractCondition:   String
	},{ collection: 'bookDetail', versionKey: false  });

	var bookDetailColl = mongoose.model('bookDetail', bookDetailSchema);

	var lession;
	var bookMasterInsertCount = 0;
	var bookDetailInsertCount = 0;
	var errorCount = 0;
	var insertedBookMaster;
	var insertedBookDetail;

	for ( var i = 1; i < lessions.length; i++ ) {
		//console.log(lessions[i]);

		lession = lessions[i];

		if (lession[0] == "") {
			if (insertedBookMaster == null){
				errorCount++;
				continue; 

			} else{
				// insert book detail record
				insertedBookDetail = new bookDetailColl({
					bookID:  				insertedBookMaster._id,
				    lession: 				lession[8],
				    subLession: 			lession[9],
				    useModule: 				lession[10],
				    useCollection: 			lession[11],
				    dataExtractCondition: 	lession[12]
				});

				insertedBookDetail.save();
				bookDetailInsertCount++;
			}
		} else {
			// insert book master record
			insertedBookMaster = new bookMasterColl({
				name:  			lession[0],
				description: 	lession[1],
				type:   		lession[2],
				level:   		lession[3],
				lessionNum:   	lession[4],
				hoursForLearn:  lession[5],
				usedNum: 		lession[6],
				recommendNum:   lession[7]
			});

			insertedBookMaster.save();
			bookMasterInsertCount++;

			// insert book detail record
			insertedBookDetail = new bookDetailColl({
				bookID:  				insertedBookMaster._id,
			    lession: 				lession[8],
			    subLession: 			lession[9],
			    useModule: 				lession[10],
			    useCollection: 			lession[11],
			    dataExtractCondition: 	lession[12]
			});

			insertedBookDetail.save();
			bookDetailInsertCount++;
		}
	};

	console.log('bookMaser collection: ' + bookMasterInsertCount.toString() + ' records was inserted.');
	console.log('bookDetail collection: ' + bookDetailInsertCount.toString() + ' records was inserted.');
	console.log('Error records: ' + errorCount.toString() );

	// disconect mongodb
	mongoose.disconnect();
});
