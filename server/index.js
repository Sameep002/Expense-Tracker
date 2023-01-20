import * as dotenv from 'dotenv'
dotenv.config({path:'./.env'})
import express from 'express';
import mongoose from 'mongoose';
import transactionDB from './models/transactionSchema.js';
import userDB from './models/userSchema.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));
const DBurl = process.env.REACT_APP_MONGODB;

mongoose.connect(DBurl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    , () => { console.log("DB connected"); });

let user;

//fetch transactions by id
app.post('/transactions', async(req, res) => {
    try {
        const {_id} = req.body;
        const data = await transactionDB.find({"logid":_id});
        return res.status(200).json({msg:data})
    } catch (error) {
        return res.status(400).json({msg:error.message})
    }
})

//fetch total by id
app.post('/total', async(req,res)=>{
    try {
        let totalExpense = 0;
        let totalSavings = 0;

        const {_id} = req.body;
        // if(!_id){
        //     return res.json({Expense:totalExpense+50 , Savings: totalSavings+50});
        // }
        const expenses = await transactionDB.find({"type":"Expense", "logid":_id});
        const savings = await transactionDB.find({"type":"Savings", "logid":_id});

        expenses.map((element)=>{
            totalExpense += element.amount;
        })
        savings.map((element)=>{
            totalSavings += element.amount;
        })

        return res.json({Expense:totalExpense , Savings: totalSavings, _id});

    } catch (error) {
        return res.status(400).json({msg:error.message})
    }
})

app.post('/registerdata', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const verify = await userDB.findOne({email:email})
        if(verify){
            return res.json({msg:"User exists already!!"});
        }
        const entry = await userDB.create({
            username,
            email,
            password,
        })
        return res.json({msg:"Registered Succesfully!!",data:entry});
    } catch (error) {
        return res.json({msg:error.message});
    }
})

app.post('/postLoginData', async (req, res) => {
    try {
        const {email, password} = req.body;
        const verify = await userDB.findOne({
            email:email,
            password:password,
        })
        if(verify){
            user=verify;
            return res.status(200).json({msg:"LoggedIn Succesfully!!",logdata:verify});
        }
        else{
            return res.status(400).json({msg:"Invalid User!!"});
        }
    } catch (error) {
        return res.json({msg:error.message});
    }
})

//fetch user
app.get('/get_user',async(req,res)=>{
    try {
        // const {email} = user;
        const resp = await userDB.find({email:user.email});
        return res.json({user:resp})
    } catch (error) {
        return res.json({msg:error.message})
    }
})

app.post('/add_transaction', async (req, res) => {
    try {
        const {description, type, amount, date, logid} =req.body;
        const entry = await transactionDB.create({
            logid,
            description,
            type,
            amount,
            date,
        })
        return res.json({msg:"Transaction Added Succesfully!!", data:entry});
    } catch (error) {
        return res.status(401).json({msg:error.message});
    }
})

app.post('/delete_transaction', async(req,res)=>{
    try {
        const del = await transactionDB.findByIdAndDelete(req.body.id)
        return res.json({msg:"Transaction Deleted Succesfully!!", data:del});
    } catch (error) {
        return res.json({msg:error.message});
    }
})

app.listen(5000, () => {
    console.log("server is running");
})