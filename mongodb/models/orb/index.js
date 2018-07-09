// grab mongoose
let mongoose = require('mongoose');

// create a Model
let Orb = mongoose.model('Orb', {

        points: {
            type: Array,
        default:
            []
        },
        owner: {
            type: String,
        default:
            '_none'
        }

    });

// export it
module.exports = Orb;
