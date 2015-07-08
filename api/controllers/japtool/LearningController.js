/**
 * Created by XuanDT2 on 6/29/2015.
 */
module.exports = {

    create: function (req, res) {
        res.view('japtool/learning/create');

    },
    add: function (req, res) {
        try {
            var params = req.params.all();
            Learning.create(params).exec(function (err, learning) {
                if (err) {
                    return res.json({err: err});
                }
                if (!learning) {
                    return res.json({err: "Error"});
                }
                res.redirect('japtool/learning/index/' + learning.id);
            });
        }
        catch (ex) {
            sails.log(ex);
        }
    },
    /**
     * GET: /learning/search
     * @param req
     * @param res
     */
    search: function (req, res) {
        return res.render('japtool/learning/search', {layout: null});
    },
    getBook:function(req,res){
        BookMaster.find().exec(function(err,books){
            if(err){

            }
            else{
                res.render('japtool/learning/search', {
                    books:books
                });
            }
        })
    },
    index: function (req, res) {
        var bookarray= new Array();
        Learning.find().exec(function (err, learnings) {
            if (err) {

            }
            if (!learnings) {

            }
            else {
                for (var i = 0; i < learnings.length; i++) {
                    BookMaster.findOne({id:learnings[i].bookId}).exec(function(err,book){
                        if(err){

                        }
                        else{
                            bookarray[i]=book;
                        }
                    })
                }
                res.view({
                    books:bookarray,
                    learnList: learnings
                });
            }
        })

    },
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    }
};