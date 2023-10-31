const { mongoose } = require("../mongodb");

const SuggestionSchema = new mongoose.Schema( 
    {
        gorus_detay: String,
        email: String,
        telefon: String,        
    },
    {
        collection: "Suggestions",
    }
);

mongoose.model("Suggestions", SuggestionSchema);