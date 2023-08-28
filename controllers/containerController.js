const Container = require("../models/Container");


exports.addContainer = async (req,res) => {
    try {
        console.log("incoming request below");
        console.log(req.body);
        let containerId = req.body.containerId;
        let sealedNumber = req.body.sealedNumber;
        let images  = req.body.imageUrls;

        let container = new Container({containerId: containerId, sealedNumber: sealedNumber, imageUrls: images});

        await container.save();
        return res.status(200).send({message: "Container Added"});
    } catch (error) {
        return res.status(400).send({message: "There was an errror"});
    }
}

exports.getContainers = async (req,res) => {
    try {
        let containers = await Container.find({});

        return res.status(200).send({message: "All Containers", data: containers});

    } catch (error) {
        return res.status(400).send({message: "There was an error"});
    }
}

exports.getContainerById = async (req,res) => {
    try {
        let container = await Container.findOne({_id: req.params.id});

        return res.status(200).send({message: "Container", data: container})

    } catch (error) {
        return res.status(400).send({message: "There was an error"});
    }
}