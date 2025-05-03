import { createContext, useState } from 'react'

export const BottomBarContext = createContext()
const BottomBarContextProvider = ({ children }) => {
    const [bottomBar, setBottomBar] = useState(null)
    return (
        <BottomBarContext.Provider
            value={{
                bottomBar,
                setBottomBar,
            }}
        >
            {children}
        </BottomBarContext.Provider>
    )
}

export default BottomBarContextProvider
