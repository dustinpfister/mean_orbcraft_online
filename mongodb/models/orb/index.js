// grab mongoose
let mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Schema
let OrbSchema = new Schema({
        
        points: {type: Array, default:[]},
        owner: {type: String, default: '_none'}
        
    });

// an orb must belong
OrbSchema.pre('save', function (next) {

   let e = null;

   if(this.owner === '_none' || !this.owner){

       e = new Error('The Orb must have an Owner')

   }

    console.log(this);

    next(e);

});

// The Orb Model
let Orb = mongoose.model('Orb', OrbSchema);

// export it
module.exports = Orb;
