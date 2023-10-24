import { Col, Row } from "antd";

const ProductCard = (props) => {
    const { urun_adi, urun_detay, fiyat } = props;

    return (
        <>
            <Row>
                <Col span={6} >
                    <div className="productCardMain">

                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ProductCard;