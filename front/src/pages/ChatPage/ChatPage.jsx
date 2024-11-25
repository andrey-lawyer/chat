import { Button, Input, List, Space, Spin } from "antd";
import { SendOutlined, DeleteOutlined } from "@ant-design/icons";
import { useChat } from "../../hooks/useChat";

import styles from "../ChatPage/ChatPage.module.css";

export const ChatPage = () => {
    const { messages, loading, sendMessage, deleteMessage, content, setContent } = useChat();

    return (
        loading ? (
            <Spin spinning={loading} />
        ) : (
            <Space direction="vertical" className={styles.space}>
                <List
                    header={<div>Chat Messages</div>}
                    bordered
                    dataSource={messages}
                    renderItem={(item) => (
                        <List.Item>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <div>
                                    <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{item.username}:</span>{" "}
                                    <span>{item.content}</span>
                                    <span style={{ fontSize: '0.8em', color: 'gray', marginLeft: '8px' }}>
                                        ({item.timestamp})
                                    </span>
                                </div>
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    onClick={() => deleteMessage(item.id)}
                                />
                            </div>
                        </List.Item>
                    )}
                />
                <Input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onPressEnter={sendMessage}
                    placeholder="Type a message"
                />
                <Button type="primary" icon={<SendOutlined />} onClick={sendMessage}>
                    Send
                </Button>
            </Space>
        )
    );
};



