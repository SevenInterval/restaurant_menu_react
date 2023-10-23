import { Button, Form } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import ProductForm from "../components/Product/ProductForm";
import ProductList from "../components/Product/ProductList";
import { errorModal, successModal } from "../utilities/modals";
import { backendUri } from "../utilities/strings";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}

const Products = () => {
    const [formProduct] = Form.useForm();
    const [productData, setProductData] = useState([])
    const [productCriteria, setProductCriteria] = useState();
    const [productAddShow, setProductAddShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const isFetchProduct = useRef(true);

    //gorsel
    const [uploadFile, setUploadFile] = useState([]);
    const [previewImage, setPreviewImage] = useState();
    const [previewVisible, setPreviewVisible] = useState(false);
    const [imageId, setImageId] = useState();

    const url = backendUri;

    useEffect(() => {
        if (isFetchProduct.current) {
            fetchAllProducts();
            isFetchProduct.current = false;
        }
        if (imageId) {
            createNewProduct(imageId);
        }
    }, [imageId]);

    const fetchAllProducts = async () => {
        setLoading(true);
        await fetch(url + '/product', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-unused-expressions
                data.products ? setProductData(data.products) : null;
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
            let criteriaProduct = {
                urun_adi: values.urun_adi,
                durum: (values.durum && typeof values.durum !== "undefined") ? values.durum : false,
                urun_detay: values.urun_detay,
                fiyat: values.fiyat,
                kategori_id: values.kategori_id
            }
            const isLt2M = uploadFile[0].originFileObj.size / 1024 / 1024 < 0.5;
            if (!isLt2M) {
                errorModal('Görsel boyutu 500KB`tan büyük olamaz!');
                return;
            }
            setProductCriteria({ ...criteriaProduct });
            const base64Object = {
                base64: await getBase64(uploadFile[0].originFileObj)
            }
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
    };

    const createNewProduct = async (imageId) => {
        let criteriaProduct = {
            urun_adi: productCriteria.urun_adi,
            durum: (productCriteria.durum && typeof productCriteria.durum !== "undefined") ? productCriteria.durum : false,
            urun_detay: productCriteria.urun_detay,
            fiyat: productCriteria.fiyat,
            kategori_id: productCriteria.kategori_id,
            imageId: imageId
        }
        let res = await fetch(url + '/product', {
            method: 'POST',
            body: JSON.stringify(criteriaProduct),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                successModal("Ürün Ekleme");
                fetchAllProducts();
                formProduct.resetFields();
                setImageId(null);
                setUploadFile([]);
                setPreviewImage();
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
        formProduct.resetFields();
        setImageId(null);
        setUploadFile([]);
        setPreviewImage();
    }

    const handleHide = () => {
        setProductAddShow(!productAddShow);
    }

    return (
        <>
            {productAddShow ?
                <ProductForm formProduct={formProduct} onFinish={onFinish}
                    onFinishFailed={onFinishFailed} addProperty={true} handleHide={handleHide}
                    handleTemizle={handleTemizle} handleUpload={handleUpload}
                    previewVisible={previewVisible} handleCancel={handleCancel} handlePreview={handlePreview}
                    previewImage={previewImage} uploadFile={uploadFile}
                /> :
                <Button icon={<PlusCircleOutlined />} type="primary" style={{ marginBottom: "12px" }} onClick={() => handleHide()}>
                    ÜRÜN EKLE
                </Button>}

            <ProductList productData={productData} loading={loading} />

        </>
    )
}

export default Products;