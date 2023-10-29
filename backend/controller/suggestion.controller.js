const { mongoose } = require("../mongodb");
const { ObjectId } = require("bson");

require("../schemas/SuggestionSchema");
const Suggestions = mongoose.model("Suggestions");

async function getAllSuggestions(req, res) {
    try {
        const allSuggestions = await Suggestions.find({});
        res.json({ status: 200, suggestions: allSuggestions });
    } catch (error) {
        res.json({ message: error });
    }
}

async function postSuggestion(req, res) {
    const { body } = req;
    const { gorus_detay, email, telefon } = body;

    console.log('Server received data:');
    console.log({ gorus_detay, email, telefon });

    // if(telefon.length > 12 || gorus_detay.length > 500) {
    //     return;
    // }

    try {
        await Suggestions.create({
            gorus_detay: gorus_detay, 
            email: email, 
            telefon: telefon
        })
        res
            .status(200)
            .json({
                message: 'Ok'
            })
    } catch (error) {
        res.json({ message: error });
    }
}

async function deleteSuggestion(req, res) {
    const { body } = req;
    const { _id } = body;

    console.log("Server received deletable _id:");
    console.log({ _id });

    try {
        await Suggestions.deleteOne({
            _id: new ObjectId(_id)
        })
        res.status(200).json(_id);
    } catch (error) {
        res.json({ message: error });
    }
}

module.exports = {
    getAllSuggestions,
    postSuggestion,
    deleteSuggestion
}