import { Form, Input, Button, Checkbox, Card, Modal, message } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { jwtDecoder } from "../common/axios";
import { _loginHandler } from "./api";
import { ForgotPwdComponent } from "./Forgotpwd";

import auth from '../common/auth';

import "./Login.css";

export const LoginComponent = () => {
  const logoSrc =
    "https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg";
  const [isModalVis, setIsModalVis] = useState(false);
  let history = useHistory();

  const onFinish = async (values) => {
    const { username, password } = values;

    let response = await _loginHandler({ username, password });
    let { status, result, accessToken } = response;
    if (result === "Success" && status == 200) {
      
      localStorage.setItem("accessToken", accessToken);
      auth.login(()=>{
        history.push('/layout');
      });

      
    } else {
      let errorMsg = response.message;
      message.error(errorMsg);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title={<img id="logo-style" src={logoSrc} />}
        bordered={false}
        style={{ width: 300 }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
            initialValue={'sriram@google.com'}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            initialValue={'Admin@123'}
          >
            <Input.Password  />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <a onClick={() => setIsModalVis(true)}>Forgot password?</a>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {isModalVis && <ForgotPwdComponent close={() => setIsModalVis(false)} />}
    </div>
  );
};
