import { useEffect, useRef, useState } from "react";
import { backendUri } from "../utilities/strings";
import { successModal } from "../utilities/modals";
import { Button, Form, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons"
import SuggestionList from "../components/Suggestion/SuggestionList";
import SuggestionForm from "../components/Suggestion/SuggestionForm";

const Oneriler = () => {
    const isFetchSuggestions = useRef(true);
    const [loading, setLoading] = useState(false);
    const [suggestionData, setSuggestionData] = useState([]);
    const [suggestionAddShow, setSuggestionAddShow] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deletableOneriId, setDeletableOneriId] = useState();
    const [formSuggestion] = Form.useForm();
    const url = backendUri;

    useEffect(() => {
        if (isFetchSuggestions.current) {
            fetchAllSuggestions();
            isFetchSuggestions.current = false;
        }
    }, []);

    const fetchAllSuggestions = async () => {
        setLoading(true);
        await fetch(url + '/suggestion', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-unused-expressions
                data.suggestions ? setSuggestionData(data.suggestions) : null;
                setLoading(false);
                return data;
            })
            .catch((res, error) => {
                res.json(error);
                res.status(405).end();
            })
    }

    const onFinish = async (values) => {
        let suggestionCriteria = {
            gorus_detay: values.gorus_detay,
            email: values.email,
            telefon: values.telefon
        }
        setLoading(true);
        let res = await fetch(url + '/suggestion', {
            method: 'POST',
            body: JSON.stringify(suggestionCriteria),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                successModal("Öneri Ekleme");
                fetchAllSuggestions();
                formSuggestion.resetFields();
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

    const handleTemizle = () => {
        formSuggestion.resetFields();
    }

    const handleHide = () => {
        setSuggestionAddShow(!suggestionAddShow);
    }

    const handleDelete = (status, oneriId) => {
        setOpenDeleteModal(status);
        if (status) {
            setDeletableOneriId(oneriId);
        } else {
            setDeletableOneriId(null);
        }
    }

    const handleOkDelete = async () => {
        setLoading(true);
        let deleteCriteria = {
            _id: deletableOneriId
        }

        let res = await fetch(url + '/suggestion', {
            method: "DELETE",
            body: JSON.stringify(deleteCriteria),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                successModal("Öneri silindi");
                setLoading(false);
                setDeletableOneriId(null);
                fetchAllSuggestions();
                setOpenDeleteModal(false);
            })
            .catch(error => {
                res.json(error);
                res.status(405).end();
            });
    }

    return (
        <>
            <Modal
                title="Modal"
                open={openDeleteModal}
                onOk={() => handleOkDelete()}
                onCancel={() => handleDelete(false)}
                okText="Onay"
                cancelText="İptal"
            >
                <p>Öneri'yi Silmek İstediğinizden Emin Misiniz?</p>
            </Modal>
            {suggestionAddShow ?
                <SuggestionForm formSuggestion={formSuggestion} onFinish={onFinish}
                    onFinishFailed={onFinishFailed} handleTemizle={handleTemizle}
                    handleHide={handleHide} loading={loading} /> :
                <Button icon={<PlusCircleOutlined />} type="primary" style={{ marginBottom: "12px" }} onClick={() => handleHide()}>
                    ÖNERİ/GÖRÜŞ EKLE
                </Button>}

            <SuggestionList suggestionData={suggestionData} loading={loading} handleDelete={handleDelete} />
        </>
    )
}

export default Oneriler;