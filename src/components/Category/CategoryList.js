import { Table } from "antd";
import React, { useState, useEffect } from "react"
import { categoryTableData } from "./categoryTableGenerate";
import { useNavigate } from "react-router-dom";
import { aktifPasifTableFilter } from "../Product/productTableFilter";

const CategoryList = (props) => {
    const { categoryData, loading } = props;
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Kategori Adı',
            dataIndex: 'kategori_adi',
            key: 'kategori_adi',
            sorter: (a, b) => a.kategori_adi.localeCompare(b.kategori_adi),
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            render: ((text, record) => <a href="#" onClick={() => handleDetailCategory(record._id)} className="tableClickItem" title={record._id}>{text}</a>)
        },
        {
            title: 'Detay',
            dataIndex: 'detay',
            key: 'detay',
            sorter: (a, b) => a.detay.localeCompare(b.detay),
        },
        {
            title: 'Sıra',
            dataIndex: 'sira',
            key: 'sira',
            sorter: (a, b) => a.sira.localeCompare(b.sira),
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
        setTableData(categoryTableData(categoryData));
    }, [categoryData])

    const handleDetailCategory = (categoryId) => {
        const data = { id: categoryId }
        navigate("/kategoriDetay", { state: data });
    }


    return (
        <>
            <Table columns={columns} dataSource={tableData} loading={loading} />
        </>
    )
}

export default CategoryList;