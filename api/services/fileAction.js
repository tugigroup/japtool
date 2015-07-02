module.exports = {
    server: function () {
        return sails.config.connections.someMongodbServer.host;
    },

    port: function () {
        return sails.config.connections.someMongodbServer.port;
    },

    database: function () {
        return sails.config.connections.someMongodbServer.database;
    },

    read: function (fd, collection, type, res) {
        var skipperAdapter = require('skipper-gridfs')({
            uri: 'mongodb://' + (this).server() + ':' + (this).port() + '/' + (this).database() + '.' + collection
        });
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
            uri: 'mongodb://' + (this).server() + ':' + (this).port() + '/' + (this).database() + '.' + collection
        }, cb);
    }
}