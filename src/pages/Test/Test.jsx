import React from 'react'
import TestPlaid from '../../components/Test/TestPlaid'
import SignUp from '../../components/Auth/SignUp'
import Logout from '../../components/Auth/Logout'


function Test() {
    return (
        <div>
            <h1>Budgeting App</h1>
            <TestPlaid /> <br />
            {/* <SignUp /> <br /> */}
            <SignIn /> <br />
            <Logout />
        </div>
    )
}

export default Test