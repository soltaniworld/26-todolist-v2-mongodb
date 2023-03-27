//help connect to remote mongodb Atlas db using credentials available in dotenv file
//https://docs.atlas.mongodb.com/getting-started/

require('dotenv').config();

function connect(mongoose) {
    const database = process.env.db;
    const username = process.env.db_USER;
    const pw = process.env.db_PW;
    const cluster_name = process.env.db_cluster;
    const connectionString = `mongodb+srv://${username}:${pw}@${cluster_name}/${database}?retryWrites=true&w=majority`;
    // replace the above with your own connection string
    // const connectionString = 'mongodb://127.0.0.1:27017/myappname'
    
    // Connect to your remote MongoDB database using Mongoose
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
        })
}

module.exports = { connect: connect };