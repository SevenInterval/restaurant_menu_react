import { Button, Checkbox, Form, Image, Input, InputNumber, Modal, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import {
    UploadOutlined, PlusCircleOutlined, EditOutlined, ClearOutlined, ShrinkOutlined,
    StepBackwardOutlined, DeleteOutlined
} from "@ant-design/icons";
import Title from "../Title";

const CategoryForm = (props) => {
    const navigate = useNavigate();
    const { formCategory, onFinish, onFinishFailed, handleTemizle, addProperty, handleDelete,
        previewVisible, handleCancel, previewImage, uploadFile, handlePreview, handleUpload,
        belgeGorsel, handleHide, loading } = props;

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
                style={{ padding: "12px" }}
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
                    <Input maxLength={45}/>
                </Form.Item>
                <Form.Item
                    label='Sıra'
                    name="sira"
                    
                    rules={[
                        {
                            required: true,
                            message: "Lütfen Sıra alanını doldurunuz!",
                        },
                    ]}
                >
                    <InputNumber min={1}/>
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

export default CategoryForm;