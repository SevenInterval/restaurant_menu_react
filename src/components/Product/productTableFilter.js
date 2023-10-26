export const productTableFilterUrunAdi = (productData) => {
    let filterData = [];
    if (productData.length > 0) {
        productData.map((product, index) => {
            let filterObject = {};
            filterObject.text = product.urun_adi;
            filterObject.value = product.urun_adi;
            filterData.push(filterObject);
        })
    }
    return filterData;
}

export const productTableFilterKategoriAdi = (productData) => {
    let filterData = [];
    if (productData.length > 0) {
        productData.map((product, index) => {
            if (filterData.filter(data => data.value === product.kategori.kategori_adi).length === 0) {
                let filterObject = {};
                filterObject.text = product.kategori ? product.kategori.kategori_adi : "-"
                filterObject.value = product.kategori ? product.kategori.kategori_adi : "-"
                filterData.push(filterObject);
            }
        })
    }
    return filterData;
}

export const aktifPasifTableFilter = () => {
    let filterData = [
        {
            text: "Aktif",
            value: "Aktif"
        },
        {
            text: "Pasif",
            value: "Pasif"
        }
    ]
    return filterData;
}