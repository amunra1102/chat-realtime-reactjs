import React, { createContext, useContext, useMemo, useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './auth-provider';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const { user: { uid } } = useContext(AuthContext);

    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    // BEGIN: rooms
    const roomsCondition = useMemo(() => ({
        fieldName: 'members',
        operator: 'array-contains',
        compareValue: uid
    }), [uid]);

    const rooms = useFirestore('rooms', roomsCondition);

    const selectedRoom = useMemo(() => rooms.find(room => room.id === selectedRoomId) || {}, [selectedRoomId, rooms]);
    // END: rooms

    // BEGIN: users
    const usersCondition = useMemo(() => ({
        fieldName: 'uid',
        operator: 'in',
        compareValue: selectedRoom?.members
    }), [selectedRoom?.members]);

    const members = useFirestore('users', usersCondition);
    // END: users

    return (
        <AppContext.Provider value={{
            rooms,
            isAddRoomVisible,
            setIsAddRoomVisible,
            selectedRoomId,
            setSelectedRoomId,
            selectedRoom,
            isInviteMemberVisible,
            setIsInviteMemberVisible,
            members
        }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
