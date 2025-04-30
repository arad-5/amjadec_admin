import React, { createContext, useState } from 'react'
export const AdminDeleteDialogContext = createContext()

const AdminDeleteDialogProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [admin, setAdmin] = useState(null)
    return (
        <AdminDeleteDialogContext.Provider
            value={{
                open,
                setOpen,
                admin,
                setAdmin,
            }}
        >
            {children}
        </AdminDeleteDialogContext.Provider>
    )
}

export default AdminDeleteDialogProvider
