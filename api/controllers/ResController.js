/**
 * ResController
 *
 * @description :: Training Respone
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @generate controller :: sudo sails generate controller res
 */

module.exports = {
	/*
	* @Respone :: res.send()
	*/ 
	send_string: function(red,res){
	   
	   /* @description :: When a String is given the Content-Type is set defaulted to "text/html" */

       	//res.set('Content-Type','text/html');
       	//res.send(new Buffer('<h1>Some text</h1>'));
       	res.send('<h1>Some text</h1>');
	},

	send_buffer: function(red,res){
	   
	   /* @description :: When a Buffer is given the Content-Type is set to "application/octet-stream" unless previously defined */
	   // Exp :: Image representation
       	res.set('Content-Type','image/png');
       	res.send(new Buffer('image meta data'));
	},

	send_array: function(red,res){
	   
	   /* @description :: When an Array or Object is given Express will respond with the JSON representation */
	   	res.send({ user: 'tobi' });
		//res.send([1,2,3]);
	},

	send_special: function(red,res){
	   
	   /* @description :: when a Number is given without any of the previously mentioned bodies, then a response body string is assigned for you.  */
	   	//res.send(200); //200 will respond will the text "OK"
		//res.send(404); //404 "Not Found" 
		res.send(500); //500 "Internal Server Error"

		//res.send(404, 'Sorry, we cannot find that!');
        //res.send(500, { error: 'something blew up' });
	},

	/*
	* @Respone :: res.json()
	*/ 
	json_object: function(red,res){
	   
	   /* 
	   * @description :: When an Array or Object is given Express will respond with the JSON representation
	   * however it may be used for explicit JSON conversion of non-objects (null, undefined, etc), though these are technically not valid JSON. 
	   */
	   	//res.json({ user: 'tobi' });
	   	//res.json([1,2,3]);

	   	res.json(null);
		res.json(500, { error: 'message' });
	},

	/*
	* @Respone :: res.view()
	*/ 
	view: function(red,res){
	   
	    /* 
	   * @description :: Uses the configured view engine to compile the view template at pathToView into HTML. 
	   * If pathToView is not provided, serves the conventional view based on the current controller and action. 
	   */

	   //res.view(); // Tu dong goi den view tuong ung : /views/[controller name]/[action name].ejs(/views/res/view.ejs)
	   //res.view('res/view'); // Se goi den view nhu da khai bao trong () (views/res/view.ejs)
	   	User.find({}).exec(function(err,results){
	   		res.view('res/view',{users:results}); // Se goi den view da khai bao trong dau () va truyen ket qua tim kiem duoc den view do(/views/res/view.ejs)
		});
	},

		/*
	* @Respone :: res.type()
	*/ 
	type: function(red,res){
	   
	   /* 
	   * @description :: Sets the "Content-Type" response header to the specified type.
	   * If pathToView is not provided, serves the conventional view based on the current controller and action. 
	   */

		// Exp :: Image representation
       	res.type('image/png');
       	res.send(new Buffer('image meta data'));
	},

};


