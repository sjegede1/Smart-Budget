import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { usePlaidLink } from "react-plaid-link";
import { AuthContext } from '../../contexts/auth_context';
import { DBContext } from '../../contexts/db_context';


function PlaidLink({linkReady, linkToken}) {
  const [publicTokenReady,setPublicTokenReady] = useState(false)
  // TODO: import email state from context
  const {uid} = useContext(AuthContext)
  const {API_HOST} = useContext(DBContext)
  // const [uid, setUid] = useState("DligyMKiXpZMaeeDQvfuf5Yyfsp1")

  const onSuccess = useCallback((public_token, metadata) => {
    const handlePublicExchange = async () => {
      try {
        const res = await axios({
          url: `${API_HOST}/api/set_access_token`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {public_token, uid},
        })
        const data = res.data
        console.log('tokenResponseDAta client-side', data)
        console.log('Metadata:', metadata)
      } catch (err) {
        console.error('onSuccess Failed: ', err)
      }
    }
    handlePublicExchange()

  },[publicTokenReady, uid])

  const onExit = useCallback((error, metadata) => {
    console.log('ONEXIT ERROR:', error)
    console.log('ONEXIT METADATA', metadata)
  },[publicTokenReady])

  const config = {
    token: linkToken,
    onSuccess,
    onExit,
  }

  const {open, ready} = usePlaidLink(config)



  return (
    <button onClick={()=>{open()}} disabled={!ready}>
      Launch Link
    </button>
  )
}

export default PlaidLink