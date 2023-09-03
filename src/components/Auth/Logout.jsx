import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {

    const navigate = useNavigate()

    const logout = async (e) => {
        const res = await axios.post('http://localhost:8080/api/logout')
        const data = res.data
        localStorage.removeItem('JWT'); 
        localStorage.removeItem("idtoken")
        navigate("/auth")
        console.log(data)
    }
    return (
        <>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default Logout