var configValues = require('./config');

module.exports = {

    getDbConnectionString: function() {
        return 'mongodb://' + configValues.uname +
        ':' + configValues.pwd +
        '@ds229450.mlab.com:29450/nodetodosample'
    }
}