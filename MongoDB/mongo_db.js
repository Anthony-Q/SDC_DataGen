const mongoose = require('mongoose');
const now = require('performance-now'); 

mongoose.connect('mongod://localhost/stressTest');

var db = mongoose.connection;

db.on('error', console.log.bind(console, ">>>MONGOOSE ERROR<<<"));
db.once('open', () => {
    console.log("====MONGOOSE CONNECTED====")
});

var changeSchema = new mongoose.Schema({
    id : {type: Number, unique: true},
    ownerName: String, 
    houseType: String, 
    title: String,
    city: String,
    guestNum: Number,
    bedroomNum: Number, 
    bedNum: Number,
    bathNum: Number,
    bathType: String,
    description: String,
    amenities: String,
})

var stress = mongoose.model('stress', changeSchema);
const start = now();
for (var i = 0; i < 1000000; i++) {
    stress.save( (err, data) => {
        if (err) {
            console.log("INSERTION ERROR", err);
        } 
    });
}
stress.on('finish', () => { //might need to change my save to a function 
    console.log(start - now() / 1000);
})