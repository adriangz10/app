import { createContext, useState } from 'react';

const UserContext = createContext({
    userData: null
});

const UserProvider = ({ children }) => {

    //datos del user logeado
    const [userData, setUserData] = useState(null);

    const isLoggedIn = () => {
        return (userData != null && userData.user != null);
    }

    const esBedel = () => {
        return (userData != null && userData.user.tipoUsuario === 1);
    }

    const esDecano = () => {
        return (userData != null && userData.user.tipoUsuario === 0)
    }

    return (
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn, esBedel, esDecano }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };