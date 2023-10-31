const CategoryCard = (props) => {
    const { kategori_adi, detay, categoryId, image, openProductList, buttonDesign } = props;

    return (
        <div className="cardMainDiv" style={{ backgroundImage: `linear-gradient(to left, rgba(0,0,0,0), rgba(2, 33, 35, 1)), url(${image})` }} onClick={() => openProductList(categoryId)}>
            <div className="cardSubDiv">
                <div className="cardDetailDiv">
                    <label className="cardKategoriAdi">{kategori_adi.toUpperCase()}</label>
                    <br />
                    <label className="cardKategoriDetay">{detay}</label>
                </div>
                <div className="cardButtonDiv">
                    {buttonDesign}
                </div>
            </div>

        </div>
    )
}



export default CategoryCard;