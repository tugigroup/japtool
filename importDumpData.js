var exec = require('child_process').exec;
var config = require('./config.json');

var importDumpData;
var command;

command = 'mongorestore --host ' 	+ config.dbhost   +
          ' --port ' 				+ config.dbport   +
          ' --db ' 					+ config.database +
          ' '						+ config.dbimport ;

importDumpData = exec(command, function (error, stdout, stderr) {
    if (stdout){
  		console.log('stdout: ' + stdout);
  	}

  	if (stderr){
  		console.log('stderr: ' + stderr);
  	}
  	
    if (error) {
      console.log('exec error: ' + error);
    } 
});