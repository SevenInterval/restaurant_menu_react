import React, { useEffect, useState } from "react";
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    let { pathname: location } = useLocation();

    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        setVisible(false);
    }, [location]);

    return (
        <nav className="navbar">
            <Layout>
                <Layout.Header className="nav-header">
                    <div className="logo">
                        <label className="brand-font"><b>MARKA BURAYA</b></label>
                        {/* <img className="brand-font" src={brandLogo} alt="brandLogo" /> */}
                    </div>
                    <div className="navbar-menu">
                        <div className="leftMenu">
                            <LeftMenu mode={"horizontal"} />
                        </div>
                        <Button className="menuButton" type="text" onClick={showDrawer}>
                            <MenuOutlined />
                        </Button>
                        {/* <div className="rightMenu">
                            <RightMenu mode={"horizontal"} />
                        </div> */}

                        <Drawer
                            title="Marka Buraya"
                            placement="right"
                            closable={true}
                            onClose={showDrawer}
                            open={visible}
                            style={{ zIndex: 99999 }}
                        >
                            <LeftMenu mode={"inline"} />
                            {/* <RightMenu mode={"inline"} /> */}
                        </Drawer>
                    </div>
                </Layout.Header>
            </Layout>
        </nav>
    );
};

export default Navbar;