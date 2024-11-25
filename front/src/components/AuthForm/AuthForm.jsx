import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { Typography } from 'antd';

const { Title } = Typography;

export const AuthForm = ({ apiMethod, buttonText, title, linkText, linkTo, linkChat  }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const data = await apiMethod(values);
            if (data?.error) {
                return message.error(data?.error);
            }
            message.success(`${title} successful!`);
            navigate(linkChat?? "/signin");
        } catch (error) {
            let errorAxios = error.response.data?.message?? `${title} failed!`
            if (error.response?.status === 401) {
                errorAxios ="Unauthorized";
            }
            message.error(errorAxios);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form name={title.toLowerCase()} onFinish={onFinish}>
            <Title style={{textAlign: "center", marginBottom: "30px"}} level={2}>Form {title}</Title>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }, { min: 4, message: 'Password must be at least 4 characters long!' },]}>
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                {buttonText}
            </Button>
            <p>
                {linkText} <Link to={linkTo}>{linkText === 'Already have an account?' ? 'Login' : 'Register'}</Link>
            </p>
        </Form>
    );
};

