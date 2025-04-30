import React, { useContext } from 'react'
import { ExcelMessageContext } from '../context/ExcelMessageContextProvider'
import MessageCollapse from '@/components/Messages/MessageCollapse'

const Messages = () => {
    const { messages, setMessages } = useContext(ExcelMessageContext)

    return (
        <div>
            {messages.map((item, i) => (
                <MessageCollapse
                    key={item?.message + i}
                    open={true}
                    setOpen={() => {}}
                    message={item?.message}
                />
            ))}
        </div>
    )
}

export default Messages
