import { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/Menu/CategoryCard";
import ProductCard from "../components/Menu/ProductCard";
import { backendUri } from "../utilities/strings";
import { Spin } from "antd";

const Menu = () => {
    const isFetchCategory = useRef(true);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const url = backendUri;

    useEffect(() => {
        if (isFetchCategory.current) {
            fetchAllCategories();
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
                setLoading(false);
                return data;
            })
            .catch((res, error) => {
                res.json(error);
                res.status(405).end();
            })
    }

    return (
        <>
            {loading ? <Spin size="large" className="spinClass" /> :
                <div className="menuPage">
                    {categoryData.length > 0 &&
                        categoryData.filter(category => category.durum === true).map((kategori, index) => {
                            return (
                                <CategoryCard kategori_adi={kategori.kategori_adi} detay={kategori.detay} />
                            )
                        })}
                    {/* <ProductCard urun_adi={"Ezogelin Çorbası"} urun_detay={"Anadolu'dan gelen harika bir lezzet"} fiyat={"30.00"} /> */}
                </div>}
        </>
    )
}

export default Menu;