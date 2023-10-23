const { mongoose } = require("../mongodb");

const ProductSchema = new mongoose.Schema( 
    {
        urun_adi: String,
        urun_detay: String,
        durum: Boolean,
        imageId: String,
        kategori_id: String,
        fiyat: String,
    },
    {
        collection: "Products",
    }
);

mongoose.model("Products", ProductSchema);