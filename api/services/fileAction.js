module.exports = {

    read: function (fd, collection, type, res) {
        var skipperAdapter = database.skipperAdapter(collection);
        skipperAdapter.read(fd, function (error, file) {
            if (error) {
                res.json(error);
            } else {
                res.contentType(type);
                res.send(new Buffer(file));
            }
        });
    },

    upload: function(parName, collection, req, cb){
        req.file(parName).upload({
            adapter: require('skipper-gridfs'),
            uri: database.uri() + '.' + collection
        }, cb);
    },

    rm: function (fd, collection, cb) {
        var skipperAdapter = database.skipperAdapter(collection);
        skipperAdapter.rm(fd, function (err) {
            if (err) return cb(err);
            return cb();
        });
    },
    
}