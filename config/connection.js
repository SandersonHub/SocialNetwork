const { connect, connection } = require('mongoose');

// Connect to the mongoDB
const connectionString = 
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';
    
connect(connectionString);

// mongo queries being executed
module.exports = connection;