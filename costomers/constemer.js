const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/microservicesCustomer", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log('customer database cennected succefully');
})
require('./Costomer')
const Constomer = mongoose.model('Customer')

app.post('/customer', (req, res)=>{
    const newConstemer = {
        name:req.body.name,
        age:req.body.age,
        address: req.body.address
    }

    let costomer = new Constomer(newConstemer)
    costomer.save().then((dt)=>{
        res.json(dt)
    }).catch((err)=>{
        console.log(err);
    })
})

app.get('/customer', (req, res)=>{
    Constomer.find().then((dt)=> {
        res.json(dt)
    }).catch((err)=>{
        console.log(err);
    })
})

app.get("/customerIdcall/:id", (req, res)=>{
    Constomer.findById(req.params.id).then((data)=>{
        res.json(data) 
        console.log(data);
    })
})

app.listen(5000, ()=>{
    console.log('port 5000 running succefull');
})