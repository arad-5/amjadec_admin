import { MessagesContext } from '@/context/MessagesContextProvider'
import React, { useContext, useEffect } from 'react'
import MessageCollapse from './MessageCollapse'
import { usePathname } from 'next/navigation'

const Messages = () => {
    const { messages, setMessages } = useContext(MessagesContext)
    const pathname = usePathname()
    useEffect(() => {
        setMessages([])
    }, [pathname])

    return (
        <div>
            {messages.map((item, i) => (
                <MessageCollapse key={i} message={item} />
            ))}
        </div>
    )
}

export default Messages
