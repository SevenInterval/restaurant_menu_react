import { Col, Row } from "antd"

const Title = (props) => {
    return (
        <Row className="pageTitleContainer">
            <Col span={24}>
                <div className="pageTitle">{props.titleName}</div>
            </Col>
        </Row>
    )
}

export default Title;
