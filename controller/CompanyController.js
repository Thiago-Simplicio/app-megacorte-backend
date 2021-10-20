const Company = require('../models/CompanySchema')

module.exports = {
    async find(req,res){
        const user = await Company.find()
        return res.json(user)
    },

    async create(req,res){
        try{
            const {tipo_company,
                nome_company,
                senha_company,
                email_company,
                cpf_company,
                cnpj_company,
                telefone_copany,
                celular_company,
                endereco_company,
                numero_compnay,
                cep_company,
                bairro_company,
                uf_company} = req.body
    
            let data = {}
    
            let user = await Company.findOne({cpf_company,cnpj_company})
            if(!user){
                data = {tipo_company,
                    nome_company,
                    senha_company,
                    email_company,
                    cpf_company,
                    cnpj_company,
                    telefone_copany,
                    celular_company,
                    endereco_company,
                    numero_compnay,
                    cep_company,
                    bairro_company,
                    uf_company}
                user = await Company.create(data)
                return res.status(200).json(user)
            }else{
                return res.status(400).json({msg: "Usuario já cadastrado"})
            }
        }
        catch(err){
            console.log("Erro ao criar company "+err)
        }
    },

    async delete(req,res){
        const {_id} = req.params;
        const user = await Company.findOne({_id})
        return res.status(200).json(user)
    }
}