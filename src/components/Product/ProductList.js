import { Table } from "antd";
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { productTableData } from "./productTableGenerate";

const ProductList = (props) => {
    const { productData, loading } = props;
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Ürün Adı',
            dataIndex: 'urun_adi',
            key: 'urun_adi',
            sorter: (a, b) => a.urun_adi.localeCompare(b.urun_adi),
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            render: ((text, record) => <a href="#" onClick={() => handleDetailProduct(record._id)} className="tableClickItem" title={record._id}>{text}</a>)
        },
        {
            title: 'Fiyat',
            dataIndex: 'fiyat',
            key: 'fiyat'
        },
        {
            title: 'Detay',
            dataIndex: 'urun_detay',
            key: 'urun_detay',
            sorter: (a, b) => a.urun_detay.localeCompare(b.urun_detay),
        },
        {
            title: 'Durum',
            dataIndex: 'durum',
            key: 'durum',
            sorter: (a, b) => a.durum.localeCompare(b.durum),
        }
    ]

    useEffect(() => {
        setTableData(productTableData(productData));
    }, [productData])

    const handleDetailProduct = (productId) => {
        const data = { id: productId }
        navigate("/urunDetay", { state: data });
    }

    return (
        <>
            <Table columns={columns} dataSource={tableData} loading={loading} />
        </>
    )
}

export default ProductList;