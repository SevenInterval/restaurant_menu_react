const { mongoose } = require("../mongodb");
const { ObjectId } = require("bson");

require("../schemas/CategorySchema");
const Categories = mongoose.model("Categories");

async function getCategoryById(req, res) {
    try {
        const { body } = req;
        const { _id } = body;
        console.log(_id);
        const category = await Categories.findOne({
            _id: new ObjectId(_id)
        }).populate("image");
        res.json({ status: 200, category: category });
    } catch (error) {
        res.json({ message: error });
    }
}

async function getAllCategories(req, res) {
    try {
        const allCategories = await Categories.find({}).populate("image");
        res.json({ status: 200, categories: allCategories });
    } catch (error) {
        res.json({ message: error });
    }
}

async function postCategory(req, res) {
    const { body } = req;
    const { kategori_adi, detay, durum, sira, imageId } = body;

    console.log('Server received data:');
    console.log({ kategori_adi, detay, durum, sira, imageId });

    try {
        await Categories.create({
            kategori_adi: kategori_adi,
            detay: detay,
            durum: durum,
            sira: sira,
            image: imageId
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

async function updateCategory(req, res) {
    const { body } = req;
    const { _id, kategori_adi, detay, durum, sira, imageId } = body;
    console.log('Server received data:');
    console.log({ _id, kategori_adi, detay, durum, sira, imageId });
    const filter = { _id: new ObjectId(_id) }
    const newCategory = {
        kategori_adi: kategori_adi,
        detay: detay,
        durum: durum,
        sira: sira,
        image: imageId
    }

    try {
        await Categories.findOneAndUpdate(filter, newCategory);
        res
            .status(200)
            .json({
                message: 'Ok'
            })
    } catch (error) {
        res.json({ message: error });
    }

}

async function deleteCategory(req, res) {
    const { body } = req;
    const { _id } = body;

    console.log("Server received deletable _id:");
    console.log({ _id });

    try {
        await Categories.deleteOne({
            _id: new ObjectId(_id)
        })
        res.status(200).json(_id);
    } catch (error) {
        res.json({ message: error });
    }
}

module.exports = {
    getCategoryById,
    getAllCategories,
    postCategory,
    updateCategory,
    deleteCategory
}