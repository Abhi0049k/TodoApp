const express = require('express');
const mongoose = require('mongoose');
const zod = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('open', () => {
    console.log('Connection established with mongodb')
})

const todoSchema = new mongoose.Schema({
    task: String,
    status: Boolean,
    email: String
}, {
    timestamps: true
})

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const todo = mongoose.model('todo', todoSchema);

const user = mongoose.model('user', userSchema);

const validatingUser = (obj) => {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })
    const response = schema.safeParse(obj);
    return response;
}

const validatingTask = (obj)=>{
    const schema = zod.object({
        task: zod.string()
    })
    const response = schema.safeParse(obj);
    return response;
}

app.post('/signup', async (req, res, next) => {
    let { email, password } = req.body;
    try {
        const check = validatingUser({ email, password });
        if (!check.success) return next({ status: 422, msg: 'Invalid Input' });
        const userExists = await user.find({ email });
        if (userExists.length > 0) return next({ status: 409, msg: 'User Already Exists' })
        password = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        const newUser = new user({ email, password })
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        next(err);
    }
})

app.post('/signin', async (req, res, next) => {
    let { email, password } = req.body;
    try {
        const check = validatingUser({ email, password });
        if (!check.success) return next({ status: 422, msg: 'Invalid Input' });
        const userDetails = await user.findOne({ email });
        if(!userDetails) return next({status: 404, msg: "User Doesn't Exist"});
        const result = await bcrypt.compare(password, userDetails.password);
        if (!result) return next({ status: 404, msg: 'User Not Found' });
        const token = jwt.sign({ email: userDetails.email }, process.env.JWT_PASSWORD);
        res.status(200).send({ msg: 'Login Successful', token });
    } catch (err) {
        next(err);
    }
})

app.use((req, res, next) => {
    const token = req.headers.authorization;
    try {
        const decode = jwt.verify(token, process.env.JWT_PASSWORD);
        req.body.email = decode.email;
        next();
    } catch (err) {
        res.status(404).send({ msg: err.message });
    }
})

app.get('/', async (req, res, next) => {
    try {
        const { email } = req.body;
        const tasklist = await todo.find({email});
        res.status(200).send(tasklist);
    } catch (err) {
        next({ msg: err.message, status: 401 });
    }
})

app.post('/', async (req, res, next)=>{
    const {task, email} = req.body;
    try{
        const check = validatingTask({task});
        if(!check.success) return next({status: 422, msg: 'Invalid Input'});
        const newTodo = new todo({task, status: false, email});
        await newTodo.save();
        res.status(201).send({msg: 'New Todo Added'});
    }catch(err){
        next({msg: err.message});
    }
})

app.patch('/:id', async (req, res, next)=>{
    const {id} = req.params;
    const {email} = req.body;
    try{
        const taskItem = await todo.findOne({_id: id, email});
        if(!taskItem) return next({msg: 'You are not Authorized', status: 403});
        await todo.findOneAndUpdate({email, _id: id}, {status: !taskItem.status});
        res.status(200).send({msg: 'Task Updated'});
    }catch(err){
        next({msg: err.message});
    }
})

app.delete('/:id', async(req, res, next)=>{
    const{id} = req.params;
    const {email} = req.body;
    try{
        const taskItem = await todo.findOne({_id: id, email});
        if(!taskItem) return next({msg: 'You are not Authorized', status: 403});
        await todo.findByIdAndDelete(id);
        res.status(200).send({msg: 'Task Deleted'})
    }catch(err){
        next({msg: err.message});
    }
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ Error: err.msg || 'Internal Server Error' });
})

app.listen(process.env.PORT, () => {
    console.log(`App running at http://localhost:${process.env.PORT}/`)
})