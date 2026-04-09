const mongoose = require('mongoose');

exports.connectDB = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URL, {
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
    .then(()=>{
        console.log("DB connection successfull!")
    })
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
}
