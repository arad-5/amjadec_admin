import { MessagesContext } from '@/context/MessagesContextProvider'
import React, { useContext, useEffect } from 'react'
import MessageCollapse from './MessageCollapse'

const Messages = () => {
    const { messages, setMessages } = useContext(MessagesContext)

    useEffect(() => {
        console.log(messages)
    }, [messages])

    return (
        <div>
            {messages.map((item, i) => (
                <MessageCollapse key={i} message={item} />
            ))}
        </div>
    )
}

export default Messages
