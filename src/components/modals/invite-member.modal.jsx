import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Select, Spin, Avatar } from 'antd';
import debounce from 'lodash/debounce';

import { db } from '../../firebase/config';
import { AppContext } from '../../context/app-provider';

const DebounceSelect = ({ fetchOptions, debounceTimeout = 300, curMembers, ...props }) => {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, curMembers]);

    useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {
                options.map((option, index) => (
                    <Select.Option key={index} value={option.value} title={option.label}>
                        <Avatar size='small' src={option.photoURL}>
                            {option.photoURL ? '' : option.label?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        {` ${option.label}`}
                    </Select.Option>
                ))
            }
        </Select>
    );
};

const fetchUserList = async (search, curMembers) => db
    .collection('users')
    .where('keywords', 'array-contains', search?.toLowerCase())
    .orderBy('displayName')
    .limit(20)
    .get()
    .then((snapshot) => {
        return snapshot.docs
            .map(doc => ({
                label: doc.data().displayName,
                value: doc.data().uid,
                photoURL: doc.data().photoURL,
            }))
            .filter(opt => curMembers?.length && !curMembers.includes(opt.value));
    });

const InviteMemberModal = () => {
    const {
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        selectedRoomId,
        selectedRoom
    } = useContext(AppContext);

    const [value, setValue] = useState([]);

    const [form] = Form.useForm();

    const handleOk = () => {
        // reset form value
        form.resetFields();
        setValue([]);

        // update members in current room
        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
            members: [...selectedRoom.members, ...value.map((val) => val.value)],
        });


        setIsInviteMemberVisible(false);
    };

    const handleCancel = () => {
        // reset form value
        form.resetFields();
        setValue([]);

        setIsInviteMemberVisible(false);
    };

    return (
        <div>
            <Modal
                title='Mời thêm thành viên'
                visible={isInviteMemberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        name='search-user'
                        label='Tên các thành viên'
                        value={value}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom?.members}
                    />
                </Form>
            </Modal>
        </div>
    );
};

export default InviteMemberModal;
