const express = require('express')
const route = express.Router()

const Cliente = require('../controller/ClienteController')
route.get('/clientes', Cliente.find)
route.post('/cliente-create', Cliente.create)
route.delete('/cliente-delete/:_id', Cliente.delete)
route.post('/cliente-login', Cliente.login)
route.get('/destroy-token', Cliente.destroytoken)

const Company = require('../controller/CompanyController')
route.get('/companyes', Company.find)
route.post('/company-create', Company.create)
route.delete('/company-delete', Company.delete)

module.exports = route