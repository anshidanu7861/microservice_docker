const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/microservicesOrder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("database connection successfully");
})

require("./Orders")
const Order = mongoose.model("Orders")

app.post('/order', (req, res)=> {
    let newOrder = {
        CustomerID: req.body.CustomerID,
        BookID: req.body.BookID,
        initialDate:req.body.initialDate,
        deliveryDate:req.body.deliveryDate
    }

    let order = new Order(newOrder)

    order.save().then(()=>{
        console.log("order created successfully");
    }).catch((err)=>{
        console.log(err);
    })
})

app.get('/order', (req, res)=>{
    Order.find().then((dt)=>{
        res.json(dt)
    }).catch((err)=>{
        console.log(err);
    })
})

app.get('/orders/:id', (req, res)=>{
    Order.findById(req.params.id).then((dt)=>{
        if(dt){
           axios.get('http://localhost:5000/customerIdcall/' + dt.CustomerID).then((response)=>{
            console.log('axios response', response);
            
            let orderObject = {customerName: response.data.name, bookTitle:""}

            axios.get("http://localhost:4000/bookids/" + dt.BookID).then((responses)=>{
                console.log(res, "second axios response");

                orderObject.bookTitle = responses.data.title
                res.json(orderObject)
            })

           })
        }else {
            res.json('invalid id')
        }
    })
})

app.listen(6000, ()=>{
    console.log('successfully running on Port 6000 ');
})

