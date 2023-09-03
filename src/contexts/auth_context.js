import React, { createContext, useState } from 'react'

const AuthContext = createContext()

function AuthContextProvider({ children }) {
    // ================================================
    // TODO: create login context that checks first for a JWT then if there's none it will redirect to AuthPage for login
    // ================================================

    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider