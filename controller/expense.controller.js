import { ErrorInfo } from '../Errors/Error.js';
import Expense from '../model/Expense.model.js'
export let AddExpense = async (req,res,next) => {
    try {
        let {Expensetext,Amount} = req.body;
        if(!Expensetext || !Amount) return next((ErrorInfo(400,'please provide an input')))
        let NewExpense = await Expense.create({
            ...req.body,
            username : req.user.username
        });
        res.status(200).json(NewExpense)
    } catch (error) {
        next(error)
    }
}
export let GetAllExpense = async (req,res,next) => {
    try {
        let NegativeTotal,PositiveTotal,TotalSum,Validator;
        let All_Expenses = await Expense.find({username : req.user.username}).sort({ createdAt : -1 })
        if(All_Expenses.length > 0){
            TotalSum = Array.from(All_Expenses).map((data) => { return data.Amount }).reduce((acc,cur) => { return acc + cur })
            NegativeTotal = Array.from(All_Expenses).map((data) => { return data.Amount }).map((data) => {return data < 0 }).includes(true)
            PositiveTotal = Array.from(All_Expenses).map((data) => { return data.Amount }).map((data) => {return data > 0 }).includes(true)
            if(NegativeTotal){
                NegativeTotal = Array.from(All_Expenses).map((data) => { return data.Amount }).filter((data) => {return data < 0 })?.reduce((acc,cur) => {return acc + cur})
            }
            if(PositiveTotal){
                PositiveTotal = Array.from(All_Expenses).map((data) => { return data.Amount }).filter((data) => {return data > 0 })?.reduce((acc,cur) => {return acc + cur})
            }
             res.status(200).json({"AllExpeneses" : All_Expenses,"TotalExpense" : TotalSum, "NegativeExpenses" : NegativeTotal, "PositiveExpeneses" : PositiveTotal})
        }else{
             res.status(200).json("None")
        }
    } catch (error) {
        next(error)
    }
}
export let SingleExpense = async (req,res,next) => {
    try {
        let SingleExpenseInfo = await Expense.findById(req.params.id)
        res.status(200).json(SingleExpenseInfo);
    } catch (error) {
        next(error)
    }
}
export let EditExpense = async (req,res,next) => {
    try {
        let id = req.params.id;
        let {Expensetext,Amount} = req.body;
        if(!Expensetext || !Amount) return next(ErrorInfo(404, 'please enter the values!'))
        let Updated = await Expense.findByIdAndUpdate(id,{
            $set : {
                Expensetext : Expensetext,
                Amount : Amount
            }
        }, {new  : true })
        res.status(200).json(Updated)
    } catch (error) {
        next(error)
    }
}
export let DeleteExpense = async (req,res,next) => {
    try {
        let id = req.params.id;
        await Expense.findByIdAndDelete(id);
        res.status(200).json('Delete successfully!')
    } catch (error) {
        next(error)
    }
}
