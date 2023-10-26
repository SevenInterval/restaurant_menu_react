import { Table } from "antd";
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { productTableData } from "./productTableGenerate";
import { aktifPasifTableFilter, productTableFilterKategoriAdi, productTableFilterUrunAdi } from "./productTableFilter";

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
            filters: productTableFilterUrunAdi(productData),
            onFilter: (value, record) => record.urun_adi.indexOf(value) === 0,
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
            title: 'Sıra',
            dataIndex: 'sira',
            key: 'sira',
            sorter: (a, b) => a.sira.localeCompare(b.sira),
        },
        {
            title: 'Kategori',
            dataIndex: 'kategori_adi',
            key: 'kategori_adi',
            filters: productTableFilterKategoriAdi(productData),
            onFilter: (value, record) => record.kategori_adi.indexOf(value) === 0,
            sorter: (a, b) => a.kategori_adi.localeCompare(b.kategori_adi),
            defaultSortOrder: 'ascend'
        },
        {
            title: 'Durum',
            dataIndex: 'durum',
            key: 'durum',
            sorter: (a, b) => a.durum.localeCompare(b.durum),
            filters: aktifPasifTableFilter(),
            onFilter: (value, record) => record.durum.indexOf(value) === 0,
        }
    ]

    useEffect(() => {
        setTableData(productTableData(productData));
    }, [productData])

    const handleDetailProduct = (productId) => {
        const data = { id: productId }
        navigate("/urunDetay", { state: data });
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <Table columns={columns} dataSource={tableData} loading={loading} onChange={onChange} />
        </>
    )
}

export default ProductList;