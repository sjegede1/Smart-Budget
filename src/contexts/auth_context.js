import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { DBContext } from './db_context'

export const AuthContext = createContext()


function AuthContextProvider({ children }) {
    // ================================================
    // TODO: create login context that checks first for a JWT then if there's none it will redirect to AuthPage for login
    // ================================================


    // ========= CHECK FOR JWT =================================
    const [idToken, setIdToken] = useState("")
    const [uid, setUid] = useState(null)
    const {API_HOST} = useContext(DBContext)

    const saveCredentialsFromEmail = async (data) => {
        if(!data) {
            await removeCredentials()
            return
        }
        console.log('auth_context.js saveCredentialsFromEmail:',data)
        // setUser(data.user)
        setUid(data.user.uid)
        setIdToken(data._tokenResponse.idToken)
        // console.log('UID:',uid,'ID_TOKEN:',idToken)
        localStorage.setItem("idToken",data._tokenResponse.idToken)
    }

    const saveCredentialsFromIdToken = async (data) => {
        if(!data) {
            await removeCredentials()
            return
        }
        // console.log('auth_context.js saveCredentialsFromIdToken:',data)
        // setUser(data.user)
        setUid(data.uid)
        console.log('UID:',uid)
    }

    const removeCredentials = async () => {
        // setUser(null)
        setUid(null)
        setIdToken(null)
        localStorage.removeItem("idToken")
    }

    const grabToken = () => {
        const localToken = localStorage.getItem("idToken")
        return localToken
    }

    const verifyToken = async () => {
        if (grabToken()) {
            const response = await axios.post(`${API_HOST}/api/loginIdToken`, {idToken: grabToken()})
            await saveCredentialsFromIdToken(response.data)
            // console.log('auth_context.js verifyToken',response.data)
        } else {
            await removeCredentials()
        }
    }


    return (
        <AuthContext.Provider value={{
            idToken, setIdToken, uid, setUid,
            grabToken, verifyToken, saveCredentialsFromEmail,saveCredentialsFromIdToken,
            removeCredentials
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider