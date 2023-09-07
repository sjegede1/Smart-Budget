import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DBContext } from '../../contexts/db_context'
import { AuthContext } from '../../contexts/auth_context'


function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password1: ''
    })
    const [passwordMatch, setPasswordMatch] = useState(false)
    const navigate = useNavigate()
    const {API_HOST} = useContext(DBContext)
    const {saveCredentialsFromEmail} = useContext(AuthContext)

    const checkPasswordMatch = () => {
        if (formData.password === '' || formData.password1 === '') {
            setPasswordMatch(false)
            return
        }
        setPasswordMatch(formData.password === formData.password1)
        console.log(passwordMatch)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value,
        })
        checkPasswordMatch()
        console.log(formData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${API_HOST}/api/signup`, formData)
            // emailExistsError(res.data)
            saveCredentialsFromEmail(res.data)
            console.log(res.data)
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }

    const emailExistsError = (data) => {
        if (data.code) {
            const errorConfig = {
                name: data.name,
                code: data.customData._tokenResponse.error.code,
                message: data.customData._tokenResponse.error.message
            }
            const error = new Error(errorConfig.message);
            error.name = errorConfig.name
            error.code = errorConfig.code
            throw error
        }
    }
    useEffect(() => {
        checkPasswordMatch()
    }, [formData])

    return (
        <>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name (optional)</label>
            <input type="text" name="name" id="name" placeholder='Enter your name'/><br />
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" onChange={handleChange} placeholder='Email' required/><br />
            <label htmlFor="password">Create Password </label>
            <input type="password" name="password" id="password" onChange={handleChange} placeholder='Password' required/><br />
            <label htmlFor="password1">Confirm Password </label>
            <input type="password" name="password1" id="password1" onChange={handleChange} placeholder='Confirm password' required/><br />
            <input type="submit" value="Sign Up" disabled={!passwordMatch} />
        </form>
        </>
    )
}

export default SignUp