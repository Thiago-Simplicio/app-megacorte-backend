const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const CompanySchema = new mongoose.Schema({
    tipo_company: String,
    nome_company: String,
    senha_company: String,
    email_company: String,
    cpf_company: String,
    cnpj_company: String,
    telefone_copany: String,
    celular_company: String,
    endereco_company: String,
    numero_compnay: String,
    cep_company: String,
    bairro_company: String,
    uf_company: String,
},{
    timestamps: true
})

CompanySchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const senha = await bcrypt.hash(this.senha_company,salt)
        this.senha_company = senha
        next()
    }
    catch(err){
        next(err)
    }
})

const Company = mongoose.model('Companies', CompanySchema)
const data = {tipo_company: String,
nome_company: String,
senha_company: String,
email_company: String,
cpf_company: String,
cnpj_company: String,
telefone_copany: String,
celular_company: String,
endereco_company: String,
numero_compnay: String,
cep_company: String,
bairro_company: String,
uf_company: String,}

module.exports = data

module.exports = Company