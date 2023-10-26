export const categoryTableData = (categoryData) => {
    let tableData = [];
    if (categoryData.length > 0) {
        categoryData.map((category, index) => {
            let categoryObject = {};
            categoryObject.key = index;
            categoryObject.kategori_adi = category.kategori_adi;
            categoryObject.detay = category.detay;
            categoryObject.sira = category.sira;
            categoryObject.durum = category.durum ? "Aktif" : "Pasif";
            categoryObject._id = category._id;
            tableData.push(categoryObject);
        })
    }
    return tableData;
}