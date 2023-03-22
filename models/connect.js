//help connect to remote mongodb Atlas db using credentials available in dotenv file
//https://docs.atlas.mongodb.com/getting-started/

require('dotenv').config();

function connect(mongoose) {
    const database = process.env.db;
    const username = process.env.db_USER;
    const pw = process.env.db_PW;
    const url = process.env.db_URL;
    // Connect to your remote MongoDB database using Mongoose
    mongoose.connect(`mongodb+srv://${username}:${pw}@${url}/${database}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
        })
}

module.exports = { connect: connect };