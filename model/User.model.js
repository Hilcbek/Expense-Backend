import mongoose from "mongoose";
let {Schema,model} = mongoose;
let UserSchema = new Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profile : {
        type : String,
        required : true
    },
    hint : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false,
    }

},{timestamps : true });
export default model('User',UserSchema);