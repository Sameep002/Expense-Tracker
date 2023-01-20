import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    // date:{
    //     type:Date,
    // }
})

const userDB = mongoose.model('user', userSchema);

export default userDB;