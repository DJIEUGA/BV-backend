const Role = require('../models/Role');

exports.getRoles = async (req,res) => {
    try {
        // console.log("REQUEST GOT HERE");
        let allRoles = await Role.find({});

        return res.status(200).send({data: allRoles});
    } catch (error) {
        return res.status(500).send({message: "There was an error"});
    }
}