import { Button, Checkbox, Form, Image, Input, InputNumber, Modal, Upload } from "antd";
import Title from "../Title";
import CategorySelector from "../Category/CategorySelector";
import { ClearOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined, ShrinkOutlined, StepBackwardOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const ProductForm = (props) => {
    const navigate = useNavigate();
    const { formProduct, onFinish, onFinishFailed, addProperty, handleHide, handleTemizle,
        previewVisible, handleCancel, previewImage, uploadFile, handlePreview, handleUpload,
        belgeGorsel, handleDelete, loading } = props;

    const geriDon = () => {
        navigate("/urunler");
    }

    return (
        <>
            {addProperty && <Title titleName={"ÜRÜN EKLE"} />}
            <Form
                form={formProduct}
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
                <CategorySelector />

                <Form.Item
                    label='Ürün Adı'
                    name="urun_adi"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen Ürün Adı alanını doldurunuz!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Detay'
                    name="urun_detay"

                    rules={[
                        {
                            required: true,
                            message: "Lütfen Ürün Detay alanını doldurunuz!",
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder="Ürün Detayını Giriniz..." maxLength={6} />
                </Form.Item>

                <Form.Item
                    label="Fiyat"
                    name='fiyat'
                    rules={[
                        {
                            required: true,
                            message: "Lütfen Fiyat alanını doldurunuz!",
                        },
                    ]}>
                    <Input />

                </Form.Item>

                <Form.Item
                    label="Sıra"
                    name='sira'
                    rules={[
                        {
                            required: true,
                            message: "Lütfen Sıra alanını doldurunuz!",
                        },
                    ]}>
                    <InputNumber min={1} />

                </Form.Item>

                <Form.Item
                    name="durum"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Checkbox>Aktif</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}> {addProperty ?
                        <>
                            <Modal
                                open={previewVisible}
                                footer={null}
                                onCancel={handleCancel}>
                                <img alt="example" style={{ width: "100%" }} src={previewImage} />
                            </Modal>
                            <Upload listType="picture-card"
                                multiple={false}
                                accept=".png, .jpg, .jpeg"
                                fileList={uploadFile}
                                onPreview={handlePreview}
                                onChange={handleUpload}
                                beforeUpload={() => false}>
                                <div>
                                    <UploadOutlined />
                                    <div alt="gorselEkle" style={{ marginTop: 8 }}>Görsel Ekle</div>
                                </div>
                            </Upload>
                        </>
                        : belgeGorsel &&
                        <Image src={belgeGorsel} width={200} />
                    }
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 16,
                    }}
                >
                    {addProperty ?
                        <>
                            <Button onClick={handleHide} icon={<ShrinkOutlined />}>
                                GİZLE
                            </Button>
                            <Button icon={<ClearOutlined />} onClick={handleTemizle} style={{ marginLeft: "16px" }}>
                                TEMİZLE
                            </Button>
                        </> :
                        <>
                            <Button icon={<StepBackwardOutlined />} onClick={() => geriDon()}>
                                GERİ DÖN
                            </Button>
                            <Button type="primary" danger icon={<DeleteOutlined />} disabled={loading}
                                style={{ marginLeft: "16px" }} onClick={() => handleDelete(true)}>SİL</Button>
                        </>
                    }
                    <Button type="primary" htmlType="submit" style={{ marginLeft: "16px" }} disabled={loading}
                        icon={addProperty ? <PlusCircleOutlined /> : <EditOutlined />}>
                        {addProperty ? "EKLE" : "GÜNCELLE"}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ProductForm;