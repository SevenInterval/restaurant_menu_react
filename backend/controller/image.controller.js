const { ObjectId } = require("bson");
const { mongoose } = require("../mongodb");

//import schema
require("../schemas/ImageSchema");
const ImageDetails = mongoose.model("ImageDetails");


//define storage area
async function uploadImage(req, res) {
    try {
        const { body } = req;
        const { base64 } = body;
        let response = await ImageDetails.create({ image: base64 });
        res.json({ status: "ok", image: response });
    } catch (error) {
        res.json({ status: error });
    }
}

async function getImageById(req, res) {
    try {
        const { body } = req;
        const { _id } = body;
        const image = await ImageDetails.findOne({
            _id: new ObjectId(_id)
        })
        res.json({ status: 200, image: image });
    } catch (error) {
        res.json({ status: error });
    }
}

async function deleteImage(req, res) {
    const { body } = req;
    const { _id } = body;

    console.log("Server received deletable _id:");
    console.log({ _id });

    try {
        await ImageDetails.deleteOne({
            _id: new ObjectId(_id)
        })
        res.status(200).json(_id);
    } catch (error) {
        res.json({ message: error });
    }
}

module.exports = {
    uploadImage,
    getImageById,
    deleteImage
}



