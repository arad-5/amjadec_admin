import React, { createContext, useState } from 'react'
export const AdminsContext = createContext()

const AdminsContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [admins, setAdmins] = useState(null)

    return (
        <AdminsContext.Provider
            value={{
                open,
                setOpen,
                admins,
                setAdmins,
            }}
        >
            {children}
        </AdminsContext.Provider>
    )
}

export default AdminsContextProvider
