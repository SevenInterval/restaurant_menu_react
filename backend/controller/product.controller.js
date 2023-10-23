const { mongoose } = require("../mongodb");
const { ObjectId } = require("bson");

require("../schemas/ProductSchema");
const Products = mongoose.model("Products");

async function getProductById(req, res) {
    try {
        const { body } = req;
        const { _id } = body;
        console.log(_id);
        const product = await Products.findOne({
            _id: new ObjectId(_id)
        })
        res.json({ status: 200, product: product });
    } catch (error) {
        res.json({ message: error });
    }
}

async function getAllProducts(req, res) {
    try {
        const allProducts = await Products.find({})
        res.json({ status: 200, products: allProducts });
    } catch (error) {
        res.json({ message: error });
    }

}

async function postProduct(req, res) {
    const { body } = req;
    const { urun_adi, urun_detay, durum, kategori_id, fiyat, imageId } = body;

    console.log('Server received data:');
    console.log({ urun_adi, urun_detay, durum, kategori_id, fiyat, imageId });

    try {
        await Products.create({
            urun_adi: urun_adi,
            urun_detay: urun_detay,
            durum: durum,
            kategori_id: kategori_id,
            fiyat: fiyat,
            imageId: imageId
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

async function updateProduct(req, res) {
    const { body } = req;
    const { _id, urun_adi, urun_detay, durum, kategori_id, fiyat, imageId } = body;
    console.log('Server received data:');
    console.log({ _id, urun_adi, urun_detay, durum, kategori_id, fiyat, imageId });
    const filter = { _id: new ObjectId(_id) }
    const newProduct = {
        urun_adi: urun_adi,
        urun_detay: urun_detay,
        durum: durum,
        kategori_id: kategori_id,
        fiyat: fiyat,
        imageId: imageId
    }

    try {
        await Products.findOneAndUpdate(filter, newProduct);
        res
            .status(200)
            .json({
                message: 'Ok'
            })
    } catch (error) {
        res.json({ message: error });
    }

}

async function deleteProduct(req, res) {
    const { body } = req;
    const { _id } = body;

    console.log("Server received deletable _id:");
    console.log({ _id });

    try {
        await Products.deleteOne({
            _id: new ObjectId(_id)
        })
        res.status(200).json(_id);
    } catch (error) {
        res.json({ message: error });
    }
}

module.exports = {
    getProductById,
    getAllProducts,
    postProduct,
    updateProduct,
    deleteProduct
}