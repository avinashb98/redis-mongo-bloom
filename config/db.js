const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = () => new Promise((resolve, reject) => {
    const uri = 'mongodb://localhost:27017/authorbloom';
    mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false })
        .then(() => {
            console.info('MongoDB connected successfully');
            resolve();
        })
        .catch((err) => {
            console.error(err);
            reject(err);
        });

    mongoose.connection.on('error', (err) => {
        console.error(err);
        console.error('MongoDB connection error. Please make sure MongoDB is running.');
        process.exit();
    });
});

module.exports = { connect };
