import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUri } from "../../utilities/strings";
import { successModal } from "../../utilities/modals";
import { Form, Modal, Spin } from "antd";
import Title from "../Title";
import CategoryForm from "./CategoryForm";
import { useForm } from "antd/es/form/Form";

const CategoryDetail = () => {
    const location = useLocation();
    const [categoryId, setCategoryId] = useState();
    const [categoryImageId, setCategoryImageId] = useState();
    const [loading, setLoading] = useState(true);
    const [belgeGorsel, setBelgeGorsel] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const url = backendUri;
    const [formCategoryDetail] = Form.useForm();
    const navigate = useNavigate();
    const isFetchCategory = useForm(false);

    useEffect(() => {
        if (location && location.state && location.state.id && !isFetchCategory.current) {
            const id = location.state.id;
            setCategoryId(id);
            findCategoryById(id);
            isFetchCategory.current = true;
        }
    }, [])

    const findCategoryById = async (id) => {
        let res = await fetch(url + '/category/byid', {
            method: 'POST',
            body: JSON.stringify({ _id: id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-unused-expressions
                formCategoryDetail.setFieldsValue({
                    kategori_adi: data.category ? data.category.kategori_adi : null,
                    detay: data.category ? data.category.detay : null,
                    durum: data.category ? data.category.durum : false,
                    sira: data.category ? data.category.sira : 0,
                })
                setCategoryImageId(data.category.image._id);
                setBelgeGorsel(data.category.image.image);
                setLoading(false);
            })
            .catch(error => {
                res.json(error);
                res.status(405).end();
            })
    }

    const onFinish = async (values) => {
        setLoading(true);
        let categoryCriteria = {
            _id: categoryId,
            kategori_adi: values.kategori_adi,
            durum: (values.durum && typeof values.durum !== "undefined") ? values.durum : false,
            detay: values.detay,
            sira: values.sira,
            imageId: categoryImageId
        }
        let res = await fetch(url + '/category', {
            method: 'PUT',
            body: JSON.stringify(categoryCriteria),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                successModal("Güncelleme");
                setLoading(false);
                navigate("/kategoriler");
            })
            .catch(error => {
                res.json(error);
                res.status(405).end();
            })
    }

    const handleOkDelete = async () => {
        setLoading(true);
        let deleteCriteria = {
            _id: categoryId
        }
        let deleteImageCriteria = {
            _id: categoryImageId
        }
        let res = await fetch(url + '/category', {
            method: "DELETE",
            body: JSON.stringify(deleteCriteria),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                console.log("Kategori silindi");
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
                navigate("/kategoriler");
            })
            .catch(error => {
                resp.json(error);
                resp.status(405).end();
            })

        let respo = await fetch(url + '/product/delete/bycategory', {
            method: "DELETE",
            body: JSON.stringify(deleteCriteria),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                console.log("Ürün silindi");
                successModal("Kategori Silme");
                setLoading(false);
                navigate("/kategoriler");
            })
            .catch(error => {
                respo.json(error);
                respo.status(405).end();
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
                    <CategoryForm formCategory={formCategoryDetail} onFinish={onFinish}
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
                        <p>Kategoriyi Silmek İstediğinizden Emin Misiniz?</p>
                    </Modal>
                </div>
            }
        </>
    )
}

export default CategoryDetail;