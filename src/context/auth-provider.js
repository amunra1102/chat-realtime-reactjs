import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';

import { auth } from '../firebase/config';

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;

                setUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
                history.push('/');
                return;
            }

            // reset user info
            setUser({});
            setIsLoading(false);
            history.push('/login');
        });

        // clean function
        return () => {
            unsubscribe();
        };
    }, [history]);

    return (
        <AuthContext.Provider value={{user}}>
            {isLoading ? <Spin/> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
