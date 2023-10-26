import { RightOutlined } from "@ant-design/icons";

const CategoryCard = (props) => {
    const { kategori_adi, detay, categoryId, image, openProductList } = props;

    return (
        <div className="cardMainDiv" style={{ backgroundImage: `linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,1)), url(${image})` }} onClick={() => openProductList(categoryId)}>
            <div className="cardSubDiv">
                <div className="cardDetailDiv">
                    <label className="cardKategoriAdi">{kategori_adi.toUpperCase()}</label>
                    <br />
                    <label className="cardKategoriDetay">{detay}</label>
                </div>
                <div className="cardButtonDiv">
                    <RightOutlined />
                </div>
            </div>

        </div>
    )
}



export default CategoryCard;