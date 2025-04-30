import { createContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
export const MessagesContext = createContext()

const MessagesContextProvider = ({ children }) => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        console.log(messages)
    }, [messages])

    const pathname = usePathname()

    useEffect(() => {
        setMessages([])
    }, [pathname])

    return (
        <MessagesContext.Provider
            value={{
                messages,
                setMessages,
            }}
        >
            {children}
        </MessagesContext.Provider>
    )
}

export default MessagesContextProvider
