export const productTableData = (productData) => {
    let tableData = [];
    if (productData.length > 0) {
        productData.map((product, index) => {
            let productObject = {};
            productObject.key = index;
            productObject.urun_adi = product.urun_adi;
            productObject.urun_detay = product.urun_detay;
            productObject.sira = product.sira;
            productObject.fiyat = "₺" + product.fiyat;
            productObject.durum = product.durum ? "Aktif" : "Pasif";
            productObject._id = product._id;
            tableData.push(productObject);
        })
    }
    return tableData;
}