import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { usePlaidLink } from "react-plaid-link";

const API_ROUTE = 'http://localhost:8080'

function PlaidLink({linkReady, linkToken}) {
  const [publicTokenReady,setPublicTokenReady] = useState(false)
  // TODO: import email state from context
  const [uid, setUid] = useState('sola-jegede')

  const onSuccess = useCallback((public_token, metadata) => {
    const handlePublicExchange = async () => {
      try {
        const res = await axios({
          url: `${API_ROUTE}/api/set_access_token`,
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

  },[publicTokenReady])

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