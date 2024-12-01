const mongoose = require('mongoose');
const express = require('express');

const app = express();

app.use(express.json());


mongoose.connect('mongodb+srv://harsha733084:4AIcDBPqoyMdmb0h@loanapp.i8dcg.mongodb.net/?retryWrites=true&w=majority&appName=loanapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));