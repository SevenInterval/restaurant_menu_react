import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const RightMenu = ({ mode }) => {

  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">Rıdvan Öztürk</span>
          </>
        }
      >
        {/* <Menu.Item key="about-us">
          <UserOutlined /> Profile
        </Menu.Item>
        <Menu.Item key="log-out">
          <LogoutOutlined /> Logout
        </Menu.Item> */}
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;