/**
 * Admin/BookController
 *
 * @description :: Server-side logic for managing admin/books
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	_config: {
        locals: {
            layout: 'layout/layout-admin'
        }
    },

    /**
   	* `Admin/BookController.index()`
   	*/
  	index: function (req, res) {

    	BookMaster.find().exec(function findCB(err,books){
   
        	res.view('admin/book/bookList',{'books':books});
      	});
  	},
};

