import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth_context'
import { useNavigate } from 'react-router-dom'
import { DBContext } from '../../contexts/db_context'

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {saveCredentialsFromEmail} = useContext(AuthContext)
    const {API_HOST} = useContext(DBContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
        console.log(formData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${API_HOST}/api/login`, formData)
            const data = res.data
            await saveCredentialsFromEmail(data)
            console.log(data)
            navigate("/")
        } catch (err) {
            console.error(err)
            // TODO: function to handle bad login credentials
        }
    }


    return (
        <>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" placeholder='email'onChange={handleChange} /><br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" placeholder='password' onChange={handleChange} />
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

export default SignIn