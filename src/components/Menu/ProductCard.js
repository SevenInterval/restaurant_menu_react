import { Col, Image, Row } from "antd";

const ProductCard = (props) => {
    const { productData } = props;

    return (
        <>
            <Row>
                {productData.length > 0 &&
                    productData.map(product => {
                        return (
                            <Col xs={12} xl={6} className="productColumn">
                                <div className="productCardMain">
                                    <Image src={product.image} />
                                    <br />
                                    <h3>{product.urunAdi.toUpperCase()}</h3>
                                    <p>{product.urunDetay}</p>
                                    <p><b>{product.fiyat}TL</b></p>
                                </div>
                            </Col>

                        )
                    })}
            </Row>
        </>
    )
}

export default ProductCard;