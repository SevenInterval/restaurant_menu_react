const { mongoose } = require("../mongodb");

const CategorySchema = new mongoose.Schema( 
    {
        kategori_adi: String,
        detay: String,
        durum: Boolean,
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ImageDetails"
        }
    },
    {
        collection: "Categories",
    }
);

mongoose.model("Categories", CategorySchema);