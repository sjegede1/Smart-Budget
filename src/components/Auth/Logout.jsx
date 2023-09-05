import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth_context'

function Logout() {

    const navigate = useNavigate()

    const {setIdToken, setJWT, removeCredentials} = useContext(AuthContext)


    const logout = async (e) => {
        const res = await axios.post('http://localhost:8080/api/logout')
        removeCredentials()
        console.log(res.data)
        navigate("/auth")
    }
    return (
        <>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default Logout