import { Table } from "antd";
import React, { useState, useEffect } from "react"
import { suggestionTableData } from "./suggestionTableGenerate";

const SuggestionList = (props) => {
    const { suggestionData, loading } = props;
    const [tableData, setTableData] = useState([]);

    const columns = [
        {
            title: 'Görüş',
            dataIndex: 'gorus_detay',
            key: 'gorus_detay',
            sorter: (a, b) => a.gorus_detay.localeCompare(b.gorus_detay),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Telefon',
            dataIndex: 'telefon',
            key: 'telefon',
            sorter: (a, b) => a.telefon.localeCompare(b.telefon),
        }
    ]

    useEffect(() => {
        setTableData(suggestionTableData(suggestionData));
    }, [suggestionData])

    return (
        <>
            <Table columns={columns} dataSource={tableData} loading={loading} />
        </>
    )
}

export default SuggestionList;