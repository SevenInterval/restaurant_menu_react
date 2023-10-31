import { Button, Space, Table } from "antd";
import React, { useState, useEffect } from "react"
import { suggestionTableData } from "./suggestionTableGenerate";
import { DeleteOutlined } from '@ant-design/icons'

const SuggestionList = (props) => {
    const { suggestionData, loading, handleDelete } = props;
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
        },
        {
            title: 'Aksiyon',
            dataIndex: 'action',
            key: 'action',
            render: ((_, record) =>
                <Space size="middle">
                    <Button type="primary" danger icon={<DeleteOutlined />} disabled={loading}
                        style={{ marginLeft: "16px" }} onClick={() => handleDelete(true, record._id)}>SİL</Button>
                </Space>
            )
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