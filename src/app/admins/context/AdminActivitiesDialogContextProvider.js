import React, { createContext, useState } from 'react'
export const AdminActivitiesDialogContext = createContext()

const AdminActivitiesDialogContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [admin, setAdmin] = useState(null)
    return (
        <AdminActivitiesDialogContext.Provider
            value={{
                open,
                setOpen,
                admin,
                setAdmin,
            }}
        >
            {children}
        </AdminActivitiesDialogContext.Provider>
    )
}

export default AdminActivitiesDialogContextProvider
