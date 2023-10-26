import { Col, Row } from "antd";

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
                                    <h2>Test</h2>
                                </div>
                            </Col>

                        )
                    })}
            </Row>
        </>
    )
}

export default ProductCard;