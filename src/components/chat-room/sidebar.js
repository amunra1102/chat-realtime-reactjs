import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import UserInfo from './user-info';
import RoomList from './room-list';

const SidebarStyled = styled.div`
    background: #3f0e40;
    color: white;
    height: 100vh;
`;

const Sidebar = () => {
    return (
        <SidebarStyled>
            <Row>
                <Col span={24}><UserInfo /></Col>
                <Col span={24}><RoomList /></Col>
            </Row>
        </SidebarStyled>
    );
};

export default Sidebar;
