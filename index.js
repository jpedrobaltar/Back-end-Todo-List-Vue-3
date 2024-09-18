//configuração inicial
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require('cors');


//forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(cors({
    origin: '*'
  }));

app.use(express.json())

//rotas da API
const todoRoutes = require('./routes/todoRoutes')

app.use('/todo', todoRoutes)


//rota inicial / endpoint
app.get('/', (req, res) => {

    //mostrar req

    res.json({message: 'oi express'})
})


//entregar uma porta
mongoose.connect('mongodb+srv://jpedrobaltar04:A7rOCmvqj6JSxvTg@cluster0.p00da.mongodb.net/bancodaapi?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('conectamos ao MangoDB')
    app.listen(3000)
})

.catch((err) => console.log(err))
