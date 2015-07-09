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
   
   			//console.log('books data : ' + JSON.stringify(books));
        	res.view('admin/book/bookList',{'books':books});
      	});
  	},

  	/**
	* `Admin/BookController.update()`
	*/
	update: function (req, res) {
	    var id=req.param("id",null);
	    
	    if(req.method=="GET" && id!=null){

	      BookMaster.findOne(id).exec(function(err,book){

	        res.view( 'admin/book/update',{'book':book});  
	      });
	    }
	    else if (req.method=="POST" && id!=null){
	      
	      	var paras = req.allParams();
	      	//console.log('all paras: ' + JSON.stringify(paras));
	      	delete paras.image_file;
	      	delete paras.id;

	     //  	//Upload file to GridFS
		    // req.file('image_file').upload({
	     //      	// don't allow the total upload size to exceed ~1MB
	     //      	maxBytes: 1000000,
	     //      	adapter: require('skipper-gridfs'),
	     //      	uri: 'mongodb://localhost:27017/files.fs'
	     //    	}, function(err, imgfiles){
		    //       	if (err) return res.negotiate(err);
		          
			   //      if (imgfiles.length != 0){
			   //          console.log('UPLOAD FILE ' + imgfiles[0]);
			   //          paras.image = imgfiles[0].fd;
			   //          console.log('fd : ' + imgfiles[0].fd);
			   //          console.log('filename : ' + imgfiles[0].filename);
		    //       	}

		    //       	// update book
		    //         BookMaster.update({id: id}, paras).exec(function(err,updated){
		    //           console.log('the record is updated : ' + JSON.stringify(updated[0]) ); 
		    //           res.redirect('admin/book/index');
		    //         });

	      	// fileAction.upload('image_file', 'files', req, function(err, imgUploaded) {
        //         if (err) return res.negotiate(err);
                
        //         if (imgUploaded.length != 0){
        //         	console.log('UPLOAD FILE ' + imgUploaded[0]);
	       //          paras.image = imgUploaded[0].fd;
	       //  	}

	       //  	// update book
	       //      BookMaster.update({id: id}, paras).exec(function(err,updated){
	       //        console.log('the record is updated : ' + JSON.stringify(updated[0]) ); 
	       //        res.redirect('admin/book/index');
	       //      });
	       //  });
	    	//});
		}
	},

	  // //Upload file to GridFS
      // req.file('avatar').upload({
      //     // don't allow the total upload size to exceed ~1MB
      //     maxBytes: 1000000,
      //     adapter: require('skipper-gridfs'),
      //     uri: 'mongodb://dulv:dulv@localhost:27017/dulv.fs'
      //   }, function(err, imgfiles){
      //     if (err) return res.negotiate(err);
          
      //     if (imgfiles.length != 0){
      //        console.log('UPLOAD FILE ' + imgfiles[0]);
      //        paras.image = imgfiles[0].fd;
      //        console.log('fd : ' + imgfiles[0].fd);
      //        //console.log('filename : ' + imgfiles[0].filename);
      //     }

      //     Vocabulary.create(paras).exec(function createVoc(err, vocabulary){
      //       res.redirect('admin/vocabulary/view/'+vocabulary.id);
      //     });
      // });







	      // //Upload file to File directory
	      // var uploadPath = process.cwd() + '/assets/images/';
	      // path = require('path');
	      
	      // req.file('avatar').upload({
	      //     maxBytes: sails.config.constants.upFileMaxBytes,
	      //     dirname: uploadPath
	      //   }, function(err, imgfiles){
	      //     if (err) return res.negotiate(err);
	          
	      //     //delete old img file first, then switch image to new file
	      //     Vocabulary.findOne(id).exec(function(err,vocabulary){

	      //       if (imgfiles.length != 0){
	      //         //console.log('UPLOAD FILE ' + imgfiles[0]);
	      //         paras.image = path.basename(imgfiles[0].fd) ;
	      //         console.log(paras.image + ' file upload done.');
	           
	      //         var fs = require('fs');

	      //         //delete old img file
	      //         if (vocabulary.image) {
	      //           fs.unlink(uploadPath + vocabulary.image, function (err) {
	      //             if (err) throw err;
	      //             console.log('successfully deleted ' + vocabulary.image);
	      //           });
	      //         }
	      //       }
	      //       else{ delete paras.image; }
	           
	      //       // update vocabulary data
	      //       Vocabulary.update({id: id}, paras).exec(function(err,updated){
	      //         console.log('the record is updated : ' + JSON.stringify(updated[0]) ); 

	      //         res.redirect('admin/vocabulary/view/' + vocabulary.id);
	      //       });
	      //     });
	      // });
	
};

