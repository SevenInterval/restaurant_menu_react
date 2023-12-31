import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUri } from "../../utilities/strings";
import { successModal } from "../../utilities/modals";
import { Form, Modal, Spin } from "antd";
import Title from "../Title";
import ProductForm from "./ProductForm";
import { useForm } from "antd/es/form/Form";

const ProductDetail = () => {
    const location = useLocation();
    const [productId, setProductId] = useState();
    const [productImageId, setProductImageId] = useState();
    const [loading, setLoading] = useState(true);
    const [belgeGorsel, setBelgeGorsel] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const url = backendUri;
    const [formProductDetail] = Form.useForm();
    const navigate = useNavigate();
    const isFetchProduct = useForm(false);

    useEffect(() => {
        if (location && location.state && location.state.id && !isFetchProduct.current) {
            const id = location.state.id;
            setProductId(id);
            findProductById(id);
            isFetchProduct.current = true;
        }
    }, [])

    const findProductById = async (id) => {
        let res = await fetch(url + '/product/byid', {
            method: 'POST',
            body: JSON.stringify({ _id: id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-unused-expressions
                formProductDetail.setFieldsValue({
                    urun_adi: data.product ? data.product.urun_adi : null,
                    urun_detay: data.product ? data.product.urun_detay : null,
                    durum: data.product ? data.product.durum : false,
                    sira: data.product ? data.product.sira : null,
                    kategori: data.product ? data.product.kategori : null,
                    fiyat: data.product ? data.product.fiyat : null,
                })
                setProductImageId(data.product.image._id);
                setBelgeGorsel(data.product.image.image);
                setLoading(false);
            })
            .catch(error => {
                res.json(error);
                res.status(405).end();
            })
    }

    const onFinish = async (values) => {
        setLoading(true);
        let productCriteria = {
            _id: productId,
            urun_adi: values.urun_adi,
            durum: (values.durum && typeof values.durum !== "undefined") ? values.durum : false,
            sira: values.sira,
            urun_detay: values.urun_detay,
            kategori: values.kategori,
            fiyat: values.fiyat,
            imageId: productImageId
        }
        let res = await fetch(url + '/product', {
            method: 'PUT',
            body: JSON.stringify(productCriteria),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                successModal("Güncelleme");
                setLoading(false);
                navigate("/urunler");
            })
            .catch(error => {
                res.json(error);
                res.status(405).end();
            })
    }

    const handleOkDelete = async () => {
        setLoading(true);
        let deleteCriteria = {
            _id: productId
        }
        let deleteImageCriteria = {
            _id: productImageId
        }
        let res = await fetch(url + '/product', {
            method: "DELETE",
            body: JSON.stringify(deleteCriteria),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                console.log("Ürün silindi");
            })
            .catch(error => {
                res.json(error);
                res.status(405).end();
            });

        let resp = await fetch(url + '/image', {
            method: "DELETE",
            body: JSON.stringify(deleteImageCriteria),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                successModal("Ürün Silme");
                setLoading(false);
                navigate("/urunler");
            })
            .catch(error => {
                resp.json(error);
                resp.status(405).end();
            })
    }

    const handleDelete = (status) => {
        setOpenDeleteModal(status);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Hatalı:', errorInfo);
    };

    return (
        <>
            {loading ?
                <Spin size="large" className="spinClass" /> :
                <div>
                    <Title titleName={"KATEGORİ DETAY"} />
                    <ProductForm formProduct={formProductDetail} onFinish={onFinish}
                        onFinishFailed={onFinishFailed} handleDelete={handleDelete}
                        belgeGorsel={belgeGorsel} loading={loading}/>
                    <Modal
                        title="Modal"
                        open={openDeleteModal}
                        onOk={() => handleOkDelete()}
                        onCancel={() => handleDelete(false)}
                        okText="Onay"
                        cancelText="İptal"
                    >
                        <p>Ürün'ü Silmek İstediğinizden Emin Misiniz?</p>
                    </Modal>
                </div>
            }
        </>
    )
}

export default ProductDetail;