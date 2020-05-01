import React, { Props, useState, useCallback } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Icon, Card } from "antd";

import { useFormatLanguage } from "../../config/locale";

import "./index.scss";
import { useDispatch, useSelector } from "react-redux";

const FormItem = Form.Item;

const LoginLayout: React.FC<{}> = function LoginLayout() {
  const dispatch = useDispatch();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername = useCallback(
    (e: any) => {
      setUsername(e.target.value);
    },
    [username]
  );

  const changePassword = useCallback(
    (e: any) => {
      setPassword(e.target.value);
    },
    [password]
  );

  const isLogin = useSelector((state) => {
    return (state as any).get("root").get("isLogin");
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 获取登录名和密码 发送到服务器
    console.log(username, password);
    // 注意 发送后需要获取到用户权限等级 并设置到redux中
    const loginAction = {
      type: "set_login",
      data: true,
    };

    // 获取到的权限赋值data 回调中设置
    const roleAction = {
      type: "set_role",
      data: "driver",
    };

    // 分发登录状态 进入首页
    dispatch(loginAction);
    dispatch(roleAction);
  };

  return (
    <>
      {!isLogin ? (
        <div className="login-wrapper">
          <div className="login-form">
            <Card title="欢迎使用管理系统">
              <Form {...formItemLayout} onSubmit={handleSubmit}>
                <FormItem label="账号">
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请输入您的账号"
                    value={username}
                    onChange={changeUsername}
                  />
                </FormItem>

                <FormItem label="密码">
                  <Input
                    placeholder="请输入您的密码"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    value={password}
                    onChange={changePassword}
                  />
                </FormItem>
                <FormItem
                  wrapperCol={{
                    xs: { span: 18, offset: 0 },
                    sm: { span: 18, offset: 3 },
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    登录
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default LoginLayout;
