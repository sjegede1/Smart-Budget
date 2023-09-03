import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import PlaidLink from '../Plaid/PlaidLink'

function TestPlaid() {
    const linkTokenText = useRef(null)
    const [formData, setFormData] = useState({})
    const [linkReady, setLinkReady] = useState(false)
    const [linkToken, setLinkToken] = useState('')
    const [userID, setUserID] = useState('')

    const [accessToken, setAccessToken] = useState('')
    const APP_HOST = 'http://localhost:8080'


    const getToken = async (e) => {
        e.preventDefault()
        try {
            let data = { user_id: userID }
            const res = await axios.post(APP_HOST+"/api/create_link_token", data)
            const { ready, link_token } = res.data;
            setLinkReady(ready); setLinkToken(link_token);
        } catch (err) {
            console.error('Failed post request client-side')//,err)
        }
    }

    const handleChange = (e) => {
        setUserID(e.target.value)
    }

    const handleDeleteToken = async (e) => {
        e.preventDefault()
        try {
            console.log(APP_HOST)
            const res = await axios.post(APP_HOST+'/api/delete_access_token',{access_token: accessToken})
            console.log(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const updateAccessToken = (e) => {
        setAccessToken(e.target.value)
        console.log('Updated Access Token:',accessToken)
    }

    useEffect(() => {
        linkTokenText.current.innerHTML = `Link Token: ${linkReady ? 'ready' : 'not ready'}`
        console.log(linkToken)
    }, [linkReady,linkToken])

    return (
        <>
            <form onSubmit={getToken} className="get-link">
                <label htmlFor="user_id">username: </label>
                <input type="text" name="user_id" id="user_id" onChange={handleChange} />
                <input type="submit" value="get link token" />
            </form>
            <p className="link-token" ref={linkTokenText}></p>
            <br /><br />
            <PlaidLink linkReady={linkReady} linkToken={linkToken}/>
            <br /><br />
            <form onSubmit={handleDeleteToken}>
                <label htmlFor="access-token"></label>
                <input type="text" name="access-token" id="access-token" onChange={updateAccessToken} /><br />
                <input type="submit" value="delete access token" />
            </form>
        </>
    )
}

export default TestPlaid