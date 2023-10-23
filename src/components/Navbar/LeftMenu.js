import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = ({ mode }) => {  
    return (
        <Menu mode={mode}>
            <Menu.Item key="kategoriler" ><Link to='/kategoriler'>Kategoriler</Link></Menu.Item>
            <Menu.Item key="urunler"><Link to='/urunler'>Ürünler</Link></Menu.Item>  
            <Menu.Item key="menu"><Link to='/menu'>Menü</Link></Menu.Item>
        </Menu>
    );
};

export default LeftMenu;