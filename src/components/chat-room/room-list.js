import React, { useContext } from 'react';
import { Collapse, Typography, Button } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';

import { AppContext } from '../../context/app-provider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header,
        p {
            color: white;
        }

        .ant-collapse-content-box {
            padding: 0 40px;
        }

        .add-room {
            color: white;
            padding: 0;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`;

const RoomList = () => {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);

    const handleAddRoom = () => setIsAddRoomVisible(true);

    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header='Danh sách các phòng' key='1'>
                {
                    rooms.map((room, index) => (
                        <LinkStyled key={index} onClick={() => setSelectedRoomId(room.id)}>
                            {room.name}
                        </LinkStyled>
                    ))
                }
                <Button
                    type='text'
                    icon={<PlusSquareOutlined />}
                    className='add-room'
                    onClick={handleAddRoom}
                >
                    Thêm phòng
                </Button>
            </PanelStyled>
        </Collapse>
    )
}

export default RoomList;