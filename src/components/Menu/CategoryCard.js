import { RightOutlined } from "@ant-design/icons";

const CategoryCard = (props) => {
    const { kategori_adi, detay } = props;

    return (
        <div className="cardMainDiv">
            <div className="cardSubDiv">
                <label className="cardKategoriAdi">{kategori_adi.toUpperCase()}</label>
                <br />
                <label className="cardKategoriDetay">{detay}</label>
            </div>
            <div className="cardButtonDiv">
                <RightOutlined />
            </div>
        </div>
    )
}



export default CategoryCard;