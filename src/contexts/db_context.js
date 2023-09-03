import React, { createContext, useState } from 'react'

const DBContext = createContext()

function DBContextProvider({ children }) {

    const [user, setUser] = useState(null)
    return (
        <DBContext.Provider>
            {children}
        </DBContext.Provider>
    )
}

export default DBContextProvider