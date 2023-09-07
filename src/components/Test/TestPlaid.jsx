import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import PlaidLink from '../Plaid/PlaidLink'
import { AuthContext } from '../../contexts/auth_context'
import { DBContext } from '../../contexts/db_context'

function TestPlaid() {
    // Set UID here and pass it to PlaidLink as prop
    const linkTokenText = useRef(null)
    // const [formData, setFormData] = useState({})
    const [linkReady, setLinkReady] = useState(false)
    const [linkToken, setLinkToken] = useState('')
    // const [userID, setUserID] = useState('')
    const {uid}  = useContext(AuthContext)
    const {API_HOST} = useContext(DBContext)

    const [accessToken, setAccessToken] = useState('')
    // const API_HOST = 'http://localhost:8080'


    const getToken = async (e) => {
        e.preventDefault()
        // if (user) setUserID(user.user.uid)
        try {
            let data = {uid}
            const res = await axios.post(API_HOST+"/api/create_link_token", data)
            const { ready, link_token } = res.data;
            setLinkReady(ready); setLinkToken(link_token);
        } catch (err) {
            console.error('Failed post request client-side')//,err)
        }
    }

    const handleChange = (e) => {
        // setUserID("DligyMKiXpZMaeeDQvfuf5Yyfsp1")
    }

    const handleDeleteToken = async (e) => {
        e.preventDefault()
        try {
            console.log(API_HOST)
            const res = await axios.post(API_HOST+'/api/delete_access_token',{access_token: accessToken})
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
        // linkTokenText.current.innerHTML = `Link Token: ${linkReady ? 'ready' : 'not ready'}`
        console.log(linkToken)
    }, [linkReady, linkToken])

    return (
        <>
            <form onSubmit={getToken} className="get-link">
                {/* <label htmlFor="user_id">username: </label>
                <input type="text" name="user_id" id="user_id" onChange={handleChange} /> */}
                <input type="submit" value="Add a new Bank Account" />
            </form>
            {/* <p className="link-token" ref={linkTokenText}></p>
            <br /><br /> */}
            <PlaidLink linkReady={linkReady} linkToken={linkToken}/>
        </>
    )
}

export default TestPlaid