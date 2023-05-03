const create = (req, res) => {
    const {name,username,email,password,avatar,background} = req.body;
    if(!name || !username || !email || !password || !avatar || !background)
    {
        return res.status(400).send({message: "Preencha todos os campos!!!"});
    }
    res.status(201).send({
        message: "Usuario Adicionado com Sucesso",
        user:{
            name,
            username,
            email,
            avatar,
            background 
        }
    });
};
module.exports = {create};