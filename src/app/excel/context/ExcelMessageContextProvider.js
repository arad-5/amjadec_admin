import { createContext, useState } from 'react'

export const ExcelMessageContext = createContext()

const ExcelMessageContextProvider = ({ children }) => {
    const [messages, setMessages] = useState([
        {
            message: 'fsafa',
        },
    ])
    return (
        <ExcelMessageContext.Provider
            value={{
                messages,
                setMessages,
            }}
        >
            {children}
        </ExcelMessageContext.Provider>
    )
}

export default ExcelMessageContextProvider
