import React, { useState } from 'react'
import SignUp from '../../components/Auth/SignUp'
import SignIn from '../../components/Auth/SignIn'

function AuthPage() {
    const [isLoggingIn, setIsLoggingIn] = useState(true)


  return (
    <div>
    {isLoggingIn ? <SignIn /> : <SignUp />}
    <button onClick={() => {setIsLoggingIn(!isLoggingIn)}}>
        {isLoggingIn ? 'Create an account' : 'Already a member? Log in' }
    </button>
    </div>
    )

}

export default AuthPage