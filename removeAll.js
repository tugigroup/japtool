var mongoose = require('mongoose');
var config = require('./config.json');

// connect to mongodb
mongoose.connect('mongodb://' + config.dbhost + '/' + config.database);

// vocabulary collection
var vocabularySchema = mongoose.Schema({
	},{ collection: 'vocabulary', versionKey: false });

var Vocabulary = mongoose.model('vocabulary', vocabularySchema);

//Vocabulary.remove({});

Vocabulary.remove({}, function (err) {
  if (err) return err;

  console.log('Vocabulary was removed all documents.');
});


// disconect mongodb
mongoose.disconnect();