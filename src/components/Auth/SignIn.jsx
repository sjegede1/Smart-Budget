import axios from 'axios'
import React, { useState } from 'react'

const API_ROUTE = 'http://localhost:8080'


function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

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
            const res = await axios.post(`${API_ROUTE}/api/login`, formData)
            const data = res.data
            if (data.JWT) {
                //TODO: Make this more programmatic and refator to more efficient code
                // ONce logged in redirect to Budget page
                localStorage.setItem('JWT',data.JWT) 
            } 
            console.log(res.data)
        } catch (err) {
            console.error(err.response)
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