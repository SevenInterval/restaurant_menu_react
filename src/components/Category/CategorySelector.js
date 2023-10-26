import { Form, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { backendUri, categoryOptionGenerate } from "../../utilities/strings";


const CategorySelector = (props) => {
    const isFetchCategory = useRef(true);
    const [loadingCategory, setLoadingCategory] = useState(true);
    const [categoryOptions, setCategoryOptions] = useState([])
    const url = backendUri;

    useEffect(() => {
        if (isFetchCategory.current) {
            fetchAllCategories();
            isFetchCategory.current = false;
        }
    }, []);

    const fetchAllCategories = async () => {
        await fetch(url + '/category', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-unused-expressions
                data.categories ? setCategoryOptions(categoryOptionGenerate(data.categories)) : null;
                setLoadingCategory(false);
            })
            .catch((res, error) => {
                res.json(error);
                res.status(405).end();
            })
    }

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Form.Item
            label="Kategori"
            name="kategori"
            rules={[
                {
                    required: true,
                    message: 'Lütfen Kategori Adı alanını doldurunuz!',
                },
            ]}
        >
            <Select
                showSearch
                placeholder="Kategori Seçiniz"
                filterOption={filterOption}
                options={categoryOptions}
                loading={loadingCategory}
            />

        </Form.Item>
    )
}

export default CategorySelector;