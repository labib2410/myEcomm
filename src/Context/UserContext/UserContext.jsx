import { createContext, useState, useEffect } from "react";
export const UserContext = createContext(null);

export default function UserContextProvider(props) {

    let [userToken, setUserToken] = useState(null);
    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            setUserToken(localStorage.getItem('userToken'));
        }
    }, [])


    return <UserContext.Provider value={{ userToken, setUserToken }}>

        {props.children}

    </UserContext.Provider>
} 