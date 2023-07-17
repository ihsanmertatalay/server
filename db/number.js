import mongoose  from "mongoose";

const numberSchema = mongoose.Schema({
    mynumber:{
        type: Number,
        required :true
    }
})



const myNumber = mongoose.model('mynumber',numberSchema)

export default myNumber