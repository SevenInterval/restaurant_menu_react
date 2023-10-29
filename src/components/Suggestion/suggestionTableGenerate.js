export const suggestionTableData = (suggestionData) => {
    let tableData = [];
    if (suggestionData.length > 0) {
        suggestionData.map((suggestion, index) => {
            let suggestionObject = {};
            suggestionObject.key = index;
            suggestionObject.gorus_detay = suggestion.gorus_detay;
            suggestionObject.email = suggestion.email;
            suggestionObject.telefon = suggestion.telefon;
            suggestionObject._id = suggestion._id;
            tableData.push(suggestionObject);
        })
    }
    return tableData;
}