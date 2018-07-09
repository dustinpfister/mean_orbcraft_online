// grab mongoose
let mongoose = require('mongoose');

// create a Model
let User = mongoose.model('User', {
        name: String,
        password: String,
        createDate: Date,
        lastOn: Date
    });

// export it
module.exports = User;
