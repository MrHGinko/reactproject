import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

import { Layout, Menu, Avatar, Dropdown } from "antd";
import { getIn } from "immutable";

const { Header } = Layout;

const AppHeader: React.FC<{}> = function AppHeader() {
  const dispatch = useDispatch();

  // const nowLanguage = useSelector((state) =>
  //   (state as any).getIn(["root", "locale"])
  // );

  // console.log("语言设置: ", nowLanguage);

  const handleMenuClick = (e: any) => {
    console.log(e.key);
    const action = {
      type: "set_language",
      data: e.key,
    };

    dispatch(action);
  };
  const languageMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="zhCN">中文</Menu.Item>
      <Menu.Item key="enUS">English</Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="logout">Log Out</Menu.Item>
      <Menu.Item key="userInfo">个人中心</Menu.Item>
    </Menu>
  );

  return (
    <Header className="app-header">
      <div className="logo">
        <p className="l-text">租约车后台管理系统</p>
      </div>
      <Menu
        className="menu"
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: "64px" }}
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item>
          <Avatar style={{ backgroundColor: "#87d068" }} icon="user" />
          <span className="title">
            <Dropdown overlay={userMenu}>
              <span>管理员</span>
            </Dropdown>
          </span>
        </Menu.Item>

        <>
          <Dropdown overlay={languageMenu}>
            <span style={{ marginLeft: "8px" }}>切换语言</span>
          </Dropdown>
        </>

        {/* <Menu.Item key="3">退出</Menu.Item> */}
      </Menu>
    </Header>
  );
};

export default AppHeader;
