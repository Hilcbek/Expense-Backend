import mongoose from "mongoose";
let {Schema,model} = mongoose;
let ExpenseSchema = new Schema({
    Expensetext : {
        type : String,
        default : 0,
        required : true,
    },
    Amount : {
        type : Number,
        default : 0,
        required : true
    },
    username : {
        type : String,
        default : 0,
        required : true,
    }
},{timestamps : true });
export default model('Expense',ExpenseSchema);