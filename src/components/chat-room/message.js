import React, { useContext } from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns/esm';
import { AuthContext } from '../../context/auth-provider';

const WrapperStyled = styled.div`
    margin-bottom: 10px;

    .author {
        margin-left: 5px;
        font-weight: bold;
    }

    .date {
        margin-left: 10px;
        font-size: 11px;
        color: #A7A7A7;
    }

    .content {
        margin-left: 30px;
    }
`;

const OwnerWrapperStyled = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;

    .container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .content-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .date {
        margin-right: 10px;
        font-size: 11px;
        color: #A7A7A7;
    }

    .content {
        margin-left: 30px;
    }
`;

const formatDate = seconds => {
    let formattedDate = '';

    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());

        formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
};

const OwnerMessage = ({ text, createdAt, photoURL, displayName }) => {
    return (
        <OwnerWrapperStyled>
            <div className='container'>
                <Typography.Text className='date'>
                    {formatDate(createdAt?.seconds)}
                </Typography.Text>
                <Avatar size='small' src={photoURL}>
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
            </div>
            <div className='content-container'>
                <Typography.Text className='content'>{text}</Typography.Text>
            </div>
        </OwnerWrapperStyled>
    );
};

const Message = ({ text, displayName, createdAt, photoURL, userId }) => {
    const { user: { uid } } = useContext(AuthContext);

    return uid === userId
        ? (<OwnerMessage text={text} createdAt={createdAt} photoURL={photoURL} displayName={displayName}/>)
        : (
            <WrapperStyled>
                <div>
                    <Avatar size='small' src={photoURL}>
                        {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Typography.Text className='author'>{displayName}</Typography.Text>
                    <Typography.Text className='date'>
                        {formatDate(createdAt?.seconds)}
                    </Typography.Text>
                </div>
                <div>
                    <Typography.Text className='content'>{text}</Typography.Text>
                </div>
            </WrapperStyled>
        );
};

export default Message;
