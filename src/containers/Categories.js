import { Button, Form } from "antd";
import { useEffect, useRef, useState } from "react";
import CategoryForm from "../components/Category/CategoryForm";
import CategoryList from "../components/Category/CategoryList";
import { backendUri } from "../utilities/strings";
import { errorModal, successModal } from "../utilities/modals";
import { PlusCircleOutlined } from "@ant-design/icons"

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}

const Categories = () => {
    const [categoryData, setCategoryData] = useState([])
    const [criteriaCategory, setCriteriaCategory] = useState();
    const [loading, setLoading] = useState(false);
    const [categoryAddShow, setCategoryAddShow] = useState(false);
    const isFetchCategory = useRef(true);
    const [formCategory] = Form.useForm();
    const url = backendUri;

    //gorsel
    const [uploadFile, setUploadFile] = useState([]);
    const [previewImage, setPreviewImage] = useState();
    const [previewVisible, setPreviewVisible] = useState(false);
    const [imageId, setImageId] = useState();

    useEffect(() => {
        if (isFetchCategory.current) {
            fetchAllCategories();
            isFetchCategory.current = false;
        }
        if (imageId) {
            createNewCategory(imageId);
        }
    }, [imageId]);

    const fetchAllCategories = async () => {
        setLoading(true);
        await fetch(url + '/category', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-unused-expressions
                data.categories ? setCategoryData(data.categories) : null;
                setLoading(false);
                return data;
            })
            .catch((res, error) => {
                res.json(error);
                res.status(405).end();
            })
    }

    const onFinish = async (values) => {
        if (uploadFile && uploadFile.length > 0) {
            let categoryCriteria = {
                kategori_adi: values.kategori_adi,
                durum: (values.durum && typeof values.durum !== "undefined") ? values.durum : false,
                detay: values.detay
            }
            const isLt2M = uploadFile[0].originFileObj.size / 1024 / 1024 < 0.5;
            if (!isLt2M) {
                errorModal('Görsel boyutu 500KB`tan büyük olamaz!');
                return;
            }
            setCriteriaCategory({ ...categoryCriteria });
            const base64Object = {
                base64: await getBase64(uploadFile[0].originFileObj)
            }
            setLoading(true);
            let res = await fetch(url + "/image", {
                method: "POST",
                body: JSON.stringify(base64Object),
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Image id: ", data.image._id);
                    setImageId(data.image._id);
                })
                .catch(error => {
                    res.json(error);
                    res.status(405).end();
                })
        } else {
            errorModal("Lütfen Görsel Ekleyiniz!");
        }
    }

    const createNewCategory = async (imageId) => {
        let categoryCriteria = {
            kategori_adi: criteriaCategory.kategori_adi,
            durum: (criteriaCategory.durum && typeof criteriaCategory.durum !== "undefined") ? criteriaCategory.durum : false,
            detay: criteriaCategory.detay,
            imageId: imageId
        }
        let res = await fetch(url + '/category', {
            method: 'POST',
            body: JSON.stringify(categoryCriteria),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                successModal("Kategori Ekleme");
                fetchAllCategories();
                formCategory.resetFields();
                setImageId(null);
                setUploadFile([]);
                setPreviewImage();
                setLoading(false);
            })
            .catch(error => {
                res.json(error);
                res.status(405).end();
            })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Hatalı:', errorInfo);
    };

    const handleUpload = (uploadFile) => {
        if (uploadFile.fileList && uploadFile.fileList.length > 1) {
            uploadFile.fileList.splice(0, 1);
        }
        setUploadFile([...uploadFile.fileList]);
    }

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.preview);
        setPreviewVisible(true);
    }

    const handleCancel = () => { setPreviewVisible(false) }

    const handleTemizle = () => {
        formCategory.resetFields();
        setImageId(null);
        setUploadFile([]);
        setPreviewImage();
    }

    const handleHide = () => {
        setCategoryAddShow(!categoryAddShow);
    }

    return (
        <>
            {categoryAddShow ?
                <CategoryForm formCategory={formCategory} onFinish={onFinish}
                    onFinishFailed={onFinishFailed} addProperty={true} handleTemizle={handleTemizle}
                    previewVisible={previewVisible} handleCancel={handleCancel} previewImage={previewImage} uploadFile={uploadFile}
                    handlePreview={handlePreview} handleUpload={handleUpload} handleHide={handleHide} loading={loading} /> :
                <Button icon={<PlusCircleOutlined />} type="primary" style={{ marginBottom: "12px" }} onClick={() => handleHide()}>
                    KATEGORİ EKLE
                </Button>}

            <CategoryList categoryData={categoryData} loading={loading} />
        </>
    )
}

export default Categories;