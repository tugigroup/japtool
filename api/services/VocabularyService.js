/**
 * translate Response
 * 
 */

module.exports = {

    //JAPANESE LANGUAGE - TEXT-TO-SPEECH (TTS) VOICES
	translate: function(languageLocale, word, callback) {
		var request = require('request');
		var streamBuffers = require("stream-buffers");
	    var url = "http://translate.google.com/translate_tts?tl=" + languageLocale + "&q=" + word;
	      
	    var myWritableStreamBuffer = new streamBuffers.WritableStreamBuffer({
	        initialSize: (100 * 1024),      // start as 100 kilobytes.
	        incrementAmount: (10 * 1024)    // grow by 10 kilobytes each time buffer overflows.
	    });

	    var r = request(url, function (error, response, buffer) {
	        if (!error && response.statusCode == 200) {
	            var data = myWritableStreamBuffer.getContents().toString('base64');
	            var result = {'audio' : data, 'success' : true };
	            callback(result);
	         } else {
	           var result = {'success' : false, 'error' : error, 'responseCode' : response.statusCode };
	           callback(result);
	         }
	      }).pipe(myWritableStreamBuffer);
  	}
}