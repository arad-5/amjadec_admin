import React, { createContext, useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'
export const TopBarContext = createContext()

const TopBarContextProvider = ({ children }) => {
    const [title, setTitle] = useState('null')
    const [icon, setIcon] = useState(null)

    useEffect(() => {
        console.log(title, icon)
    }, [title, icon])

    return (
        <TopBarContext.Provider
            value={{
                title,
                setTitle,
                icon,
                setIcon,
            }}
        >
            {children}
        </TopBarContext.Provider>
    )
}

export default TopBarContextProvider
