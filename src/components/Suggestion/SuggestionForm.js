import { Button, Form, Input } from "antd";
import { PlusCircleOutlined, ClearOutlined, ShrinkOutlined } from "@ant-design/icons";
import Title from "../Title";

const { TextArea } = Input;

const SuggestionForm = (props) => {
    const { formSuggestion, onFinish, onFinishFailed, handleTemizle, addProperty, handleHide, loading } = props;

    return (
        <>
            {addProperty && <Title titleName={"ÖNERİ / GÖRÜŞ EKLE"} />}
            <Form
                form={formSuggestion}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelCol={{
                    span: 6
                }}
                wrapperCol={{
                    span: 12
                }}
                style={{ padding: "12px" }}
            >
                <Form.Item
                    label='Email'
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen Email alanını doldurunuz!',
                        },
                        {
                            type: 'email',
                            message: 'Lütfen doğru bir Email adresi giriniz!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Telefon'
                    name="telefon"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen Telefon alanını doldurunuz!",
                        },
                    ]}
                >
                    <Input maxLength={45} />
                </Form.Item>

                <Form.Item
                    label='Görüş / Öneri'
                    name="gorus_detay"

                    rules={[
                        {
                            required: true,
                            message: "Lütfen Görüş / Öneri alanını doldurunuz!",
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder="Görüş ve Önerilerinizi Giriniz..." />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 16,
                    }}
                >
                    <Button onClick={handleHide} icon={<ShrinkOutlined />}>
                        GİZLE
                    </Button>
                    <Button icon={<ClearOutlined />} onClick={handleTemizle} style={{ marginLeft: "16px" }}>
                        TEMİZLE
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: "16px" }} disabled={loading}
                        icon={<PlusCircleOutlined />}>
                        EKLE
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}

export default SuggestionForm;