const express = require('express')
const route = express.Router()

const Cliente = require('../controller/ClienteController')
route.get('/clientes', Cliente.find)
route.post('/cliente-create', Cliente.create)
route.delete('/cliente-delete/:_id', Cliente.delete)
route.post('/cliente-login', Cliente.login)
route.get('/destroy-token', Cliente.destroytoken)

module.exports = route