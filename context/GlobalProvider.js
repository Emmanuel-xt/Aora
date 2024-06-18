import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext= createContext();
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const get = async () => {

           await getCurrentUser()
            .then((res) => {
                if(res){
                    console.log('response =',res)
                    setIsLoggedIn(true)
                    setUser(res)
                    }else{
                    console.log('response not found ')
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
        get()
    }, [])
    

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}