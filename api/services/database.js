module.exports = {
	host: function () {
        return sails.config.connections.someMongodbServer.host;
    },

    port: function () {
        return sails.config.connections.someMongodbServer.port;
    },

    name: function () {
        return sails.config.connections.someMongodbServer.database;
    },

    uri: function () {
    	return 'mongodb://' + 
    			(this).host() + ':' +
    			(this).port() + '/' +
    			(this).name();
    },

    skipperAdapter: function (collection) {
        return require('skipper-gridfs')({
            uri: (this).uri() + '.' + collection
        });
    },
    
}