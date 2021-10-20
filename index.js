const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/megacorte',{
    useNewUrlParser: true
}).then(function(){
    console.log("Servidor conectado ao MongoDB")
}).catch(function(error){
    console.log("Erro ao conetcar ao MongoDB "+error)
})

const route = require('./route/route')
app.use('/', route)

const port = 3001
app.listen(port, function(){
    console.log("Servidor inciado na porta "+port)
})