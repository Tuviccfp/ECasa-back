const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ecasa', {
}).then((result) => {
    console.log('Connect to MongoDB')
}).catch((err) => {
    console.log('Error to connect')
});