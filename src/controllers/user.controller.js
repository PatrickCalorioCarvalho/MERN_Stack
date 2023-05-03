const create = (req, res) => {
    const user = req.body;
    console.log(user);
    res.json(user);
};
module.exports = {create};