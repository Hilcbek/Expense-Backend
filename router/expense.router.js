import express from 'express'
import { AddExpense, DeleteExpense, EditExpense, GetAllExpense, SingleExpense} from '../controller/expense.controller.js';
import { verifyToken } from '../JWT/verifyToken.js';
export let routerExpense = express.Router();
routerExpense.post('/',AddExpense)
routerExpense.get('/', GetAllExpense)
routerExpense.get('/:id', SingleExpense)
routerExpense.put('/edit/:id', EditExpense)
routerExpense.delete('/delete/:id', DeleteExpense)
