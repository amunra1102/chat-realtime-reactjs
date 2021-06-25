import React from 'react';
import { Row, Col } from 'antd';

import Sidebar from './sidebar';
import ChatWindow from './chat-window';

const ChatRoom = () => {
    return (
        <Row>
            <Col span={6}><Sidebar /></Col>
            <Col span={18}><ChatWindow /></Col>

        </Row>
    );
};

export default ChatRoom;
