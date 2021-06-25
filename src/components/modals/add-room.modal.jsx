import React, { useContext } from 'react';
import { Modal, Form, Input } from 'antd';

import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../context/auth-provider';
import { AppContext } from '../../context/app-provider';

const AddRoomModal = () => {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext);

    const [form] = Form.useForm();

    const handleOk = () => {
        // add new room to firestore
        addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });

        // reset form value
        form.resetFields();

        setIsAddRoomVisible(false);
    };

    const handleCancel = () => setIsAddRoomVisible(false);

    return (
        <div>
            <Modal
                title='Tạo phòng'
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label='Tên phòng' name='name'>
                        <Input placeholder='Nhập tên phòng' />
                    </Form.Item>
                    <Form.Item label='Mô tả' name='description'>
                        <Input.TextArea placeholder='Nhập mô tả' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddRoomModal;
