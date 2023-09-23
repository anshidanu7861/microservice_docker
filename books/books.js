const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require("./BookModel")
const Book = mongoose.model('Book')

mongoose.connect("mongodb://127.0.0.1:27017/microservicesBook", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("data base connected successfully");
})

const app = express()
app.use(bodyParser.json())


app.get('/', (req, res)=> {
    res.send('book page') 
})
app.post("/books", (req, res)=> {
  let newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher
  }

  let book = new Book(newBook)
  book.save().then(()=>{
    console.log('save new data in database');
    res.json('saved')
  }).catch((err)=>{
    console.log(err);
  })
})

app.get('/books', (req, res)=>{
    Book.find().then((dt)=>{
        console.log(dt, "show all data");
        res.json( dt)
    }).catch((err)=>{
        console.log(err);
    })
})

app.get('/bookids/:id', (req, res)=>{
    Book.findById(req.params.id).then((data)=>{
        console.log(data);
        res.json(data)
    }).catch((err)=>{
        console.log(err);
    })
})

app.listen(4000, ()=> {
    console.log('Up and running! 4000 This is books service');
})