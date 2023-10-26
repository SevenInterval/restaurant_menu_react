const { mongoose } = require("../mongodb");

const ProductSchema = new mongoose.Schema( 
    {
        urun_adi: String,
        urun_detay: String,
        durum: Boolean,
        sira: String,
        kategori: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        },
        fiyat: String,
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ImageDetails"
        }
    },
    {
        collection: "Products",
    }
);

mongoose.model("Products", ProductSchema);