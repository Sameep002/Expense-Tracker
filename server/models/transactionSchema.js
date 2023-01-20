import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    logid:{
        type:String,
    },
    description:{
        type: String,
        // required: true
    },
    type:{
        type: String,
        // required: true
    },
    amount:{
        type:Number,
        // required:true
    },
    date:{
        type:String,
    }
})

const transactionDB = mongoose.model('Transaction', transactionSchema);

export default transactionDB;