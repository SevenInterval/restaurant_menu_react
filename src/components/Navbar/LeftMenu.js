import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = ({ mode }) => {
    return (
        <Menu mode={mode}>
            <Menu.Item style={{ letterSpacing: "0.5px" }} key="kategoriler" ><Link to='/kategoriler'>KATEGORİLER</Link></Menu.Item>
            <Menu.Item style={{ letterSpacing: "0.5px" }} key="urunler"><Link to='/urunler'>ÜRÜNLER</Link></Menu.Item>
            <Menu.Item style={{ letterSpacing: "0.5px" }} key="oneriler"><Link to='/oneriler'>ÖNERİLER</Link></Menu.Item>
            <Menu.Item style={{ letterSpacing: "0.5px" }} key="menu"><Link to='/menu'>MENÜ</Link></Menu.Item>
        </Menu>
    );
};

export default LeftMenu;