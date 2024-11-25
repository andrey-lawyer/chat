import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useUser} from "../redux/useUser";
import {currentUser} from "../redux/userSlice";
import {message} from "antd";

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const socketRef = useRef(null);
    const dispatch = useDispatch();
    const { user, loading } = useUser();

    useEffect(() => {
        if (!user) {
            dispatch(currentUser())
        }
    // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        if (!user) return;
        socketRef.current = new WebSocket('/api/ws/chat');

        socketRef.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        socketRef.current.onmessage = (event) => {
            if (event.data.startsWith("Error:")) {return message.error(event.data) }

            const data = JSON.parse(event.data);

            if (data?.isDeleted) {
                // Обработка удаления сообщения
                setMessages((prevMessages) =>
                    prevMessages.filter(message => message.id !== data.id)
                );
            } else {
                // Обработка нового сообщения
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socketRef.current.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        return () => {
            socketRef.current.close();
        };
    }, [user]);

    const sendMessage = () => {
        if (content) {
            if (socketRef.current.readyState === WebSocket.OPEN) {
                const messageToSend = {
                    text: content
                };
                socketRef.current.send(JSON.stringify(messageToSend));
                setContent('');
            } else {
                console.log('WebSocket is not open. Current state:', socketRef.current.readyState);
            }
        }
    };

    const deleteMessage = (id) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            const messageToDelete = {
                deleteId: id
            };
            socketRef.current.send(JSON.stringify(messageToDelete));
        }
    };
    return {messages, loading,sendMessage, deleteMessage, content, setContent};

}