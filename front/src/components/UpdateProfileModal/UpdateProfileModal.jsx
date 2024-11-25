import { useEffect } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/userSlice';

const { Title, Text } = Typography;



export const UpdateProfileModal = ({ visible, onClose, currentUsername }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ username: currentUsername || '', password: '' });
    }, [currentUsername, form]);

    const onFinish = async (values) => {
        console.log(values);
        const updateData = { newUsername: values.username, newPassword: values.password };
        await dispatch(updateUser(updateData));
        onClose();
        form.resetFields();
    };

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form
                key={"form"}
                form={form}
                name="updateProfile"
                onFinish={onFinish}
                layout="vertical"
            >
                <Title level={4} style={{ textAlign: 'center', marginBottom: '10px' }}>Update Your Profile</Title>
                <Text type="warning" style={{display:"block",  marginBottom: '10px' }}>In order to apply the changes to your profile, you will need to log in again.
                    You will be redirected to the login page.</Text>

                <Form.Item
                    name="username"
                >
                    <Input placeholder="New Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[  { min: 4, message: 'Password must be at least 4 characters long!' }]}
                >
                    <Input.Password placeholder="New Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update Profile
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
