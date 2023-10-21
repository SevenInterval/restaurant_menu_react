const { mongoose } = require("../mongodb");

const CategorySchema = new mongoose.Schema( 
    {
        kategori_adi: String,
        detay: String,
        durum: Boolean,
        imageId: String
    },
    {
        collection: "Categories",
    }
);

mongoose.model("Categories", CategorySchema);