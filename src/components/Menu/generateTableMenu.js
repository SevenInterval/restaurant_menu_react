export const generateProductDetail = (productData) => {
    let menuData = [];
    productData.filter(data => data.durum === true).map((product) => {
        let menuObject = {};
        menuObject.categoryId =  product.kategori ? product.kategori._id : null;
        menuObject.urunAdi = product.urun_adi;
        menuObject.urunDetay = product.urun_detay;
        menuObject.sira = product.sira;
        menuObject.fiyat = product.fiyat;
        menuObject.image = product.image ? product.image.image : null
        menuData.push(menuObject);
    })
    return menuData;
}