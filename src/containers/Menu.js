import { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/Menu/CategoryCard";
import ProductCard from "../components/Menu/ProductCard";
import { backendUri } from "../utilities/strings";
import { Spin } from "antd";
import { generateProductDetail } from "../components/Menu/generateTableMenu";

const Menu = () => {
    const isFetchCategory = useRef(true);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [selected, setSelected] = useState({});
    const url = backendUri;

    useEffect(() => {
        if (isFetchCategory.current) {
            fetchAllCategories();
            fetchAllProducts();
            isFetchCategory.current = false;
        }
    }, []);

    const fetchAllCategories = async () => {
        setLoading(true);
        await fetch(url + '/category', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-unused-expressions
                data.categories ? setCategoryData(data.categories) : null;
                return data;
            })
            .catch((res, error) => {
                res.json(error);
                res.status(405).end();
            })
    }

    const fetchAllProducts = async () => {
        await fetch(url + '/product', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                // eslint-disable-next-line no-unused-expressions
                data.products ? setProductData(generateProductDetail(data.products)) : null;
                setLoading(false);
                return data;
            })
            .catch((res, error) => {
                res.json(error);
                res.status(405).end();
            })
    }

    const openProductList = (categoryId = null) => {
        setSelected({ ...selected, [categoryId]: !selected[categoryId] })
    }

    return (
        <>
            {loading ? <Spin size="large" className="spinClass" /> :
                <div className="menuPage">
                    {categoryData.length > 0 &&
                        categoryData.filter(category => category.durum === true)
                            .sort((a, b) => a.sira - b.sira)
                            .map((kategori, index) => {
                                return (
                                    <>
                                        <CategoryCard kategori_adi={kategori.kategori_adi} detay={kategori.detay} categoryId={kategori._id} image={kategori.image.image}
                                            openProductList={openProductList} />
                                        <div style={selected[kategori._id] ? { display: "block" } : { display: "none" }}>
                                            <ProductCard productData={productData.filter(data => data.categoryId === kategori._id)} />
                                        </div>
                                    </>
                                )
                            })}
                </div>}
        </>
    )
}

export default Menu;