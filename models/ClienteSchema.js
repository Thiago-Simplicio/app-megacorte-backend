const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const ClienteSchema = new mongoose.Schema({
    nome_cliente: String,
    sobrenome_cliente: String,
    email_cliente: String,
    senha_cliente: String,
    contato_cliente: String
},{
    timestamps: true
})

ClienteSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    const senha = await bcrypt.hash(this.senha_cliente,salt)
    this.senha_cliente = senha
    next()
})

ClienteSchema.pre('findOneAndUpdate', function(next){
    let senha = this.getUpdate().senha_cliente+=""
    if(senha.length < 22){
        this.senha = bcrypt.hashSync(this.senha_cliente)
        next()
    }
    next()
})

ClienteSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.senha_cliente, function(err, same){
        if(err){
            callback(err)
        }else{
            callback(err,same)
        }
    })
}

const Cliente = mongoose.model('Clientes', ClienteSchema)
module.exports = Cliente