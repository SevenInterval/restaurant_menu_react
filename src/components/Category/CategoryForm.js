import { Button, Checkbox, Form, Image, Input, Modal, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import Title from "../Title";

const CategoryForm = (props) => {
    const navigate = useNavigate();
    const { formCategory, onFinish, onFinishFailed, handleTemizle, addProperty, handleDelete,
        previewVisible, handleCancel, previewImage, uploadFile, handlePreview, handleUpload,
        belgeGorsel } = props;

    const geriDon = () => {
        navigate("/kategoriler");
    }

    return (
        <>
            {addProperty && <Title titleName={"KATEGORİ EKLE"} />}
            <Form
                form={formCategory}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelCol={{
                    span: 6
                }}
                wrapperCol={{
                    span: 12
                }}
                style={{ align: "" }}
            >
                <Form.Item
                    label='Kategori Adı'
                    name="kategori_adi"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen Kategori Adı alanını doldurunuz!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Detay'
                    name="detay"

                    rules={[
                        {
                            required: true,
                            message: "Lütfen Detay alanını doldurunuz!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="durum"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 11,
                        span: 16,
                    }}
                >
                    <Checkbox>Aktif</Checkbox>
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 10,
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
                        <Button onClick={handleTemizle}>
                            TEMİZLE
                        </Button> :
                        <>
                            <Button onClick={() => geriDon()}>
                                GERİ DÖN
                            </Button>
                            <Button type="primary" style={{ marginLeft: "12px" }} onClick={() => handleDelete(true)}>SİL</Button>
                        </>
                    }
                    <Button type="primary" htmlType="submit" style={{ marginLeft: "12px" }}>
                        {addProperty ? "EKLE" : "GÜNCELLE"}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}

export default CategoryForm;