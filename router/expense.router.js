import express from 'express'
import { AddExpense, DeleteExpense, EditExpense, GetAllExpense, SingleExpense} from '../controller/expense.controller.js';
import { verifyToken } from '../JWT/verifyToken.js';
export let routerExpense = express.Router();
routerExpense.post('/',verifyToken,AddExpense)
routerExpense.get('/', verifyToken, GetAllExpense)
routerExpense.get('/:id', verifyToken, SingleExpense)
routerExpense.put('/edit/:id',verifyToken, EditExpense)
routerExpense.delete('/delete/:id',verifyToken, DeleteExpense)