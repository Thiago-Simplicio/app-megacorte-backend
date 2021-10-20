const Cliente = require('../models/ClienteSchema')
const jwt = require('jsonwebtoken')
const secrete = 'mysecrete'

module.exports = {
    async find(req,res){
        const cli = await Cliente.find()
        return res.json(cli)
    },

    async create(req,res){
        
        try{
            const {
                nome_cliente,
                sobrenome_cliente,
                email_cliente,
                senha_cliente,
                contato_cliente
            } = req.body
    
            let data = {}
    
            let cli = await Cliente.findOne({email_cliente})
            if(!cli){
                data = {
                    nome_cliente,
                    sobrenome_cliente,
                    email_cliente,
                    senha_cliente,
                    contato_cliente
                }
                cli = await Cliente.create(data)
                return res.status(200).json(cli)
            }else{
                return res.status(400).json({msg: "Cliente já cadastrado"})
            }
        }
        catch(error){
            return res.status(400).json({msg: "Erro ao criar cliente "+error})
        }
        
    },

    async delete(req,res){
        const {_id} = req.params
        const cli = await Cliente.findOneAndDelete({_id})
        return res.status(200).json(cli)
    },

    async login(req,res){
        const {email_cliente, senha_cliente} = req.body

        await Cliente.findOne({email_cliente}, function(err,user){
            if(err){
                res.status(200).json({msg: "Erro no servidor"})
            }else if(!user){
                res.status(200).json({status: 1, msg: "Usuario não encontrado, favor digitar email valido"})
            }
            user.isCorrectPassword(senha_cliente, async function(err,same){
                if(err){
                    res.status(200).json({msg: "Erro no servidor"})
                }else if(!same){
                    res.status(200).json({status: 2, msg: "Senha não confere, tente novamente"})
                }else{
                    const playload = {email_cliente}
                    const token = jwt.sign(playload, secrete, {
                        expiresIn: '24h'
                    })
                    res.cookie('token', token, {httpOnly: true})
                    res.status(200).json({status: 3, auth: true, token: token, id: user._id, nome: user.nome_cliente})
                }
            })
        })
    },

    async destroytoken(req,res){
        const token = req.headers.token
        if(token){
            res.cookie('token', null, {httpOnly: true})
        }else{
            res.status(401).send("Token invalido")
        }
        res.send("Sessão finalizada")
    }
}