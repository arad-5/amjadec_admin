import React, { createContext, useEffect, useState } from 'react'
export const AdminEditDialogContext = createContext()

const AdminEditDialogContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')
    const [adminId, setAdminId] = useState('')
    const [permissions, setPermissions] = useState([])
    const handleClearContext = () => {
        setFullname('')
        setPhone('')
        setRole('')
        setPermissions([])
    }
    return (
        <AdminEditDialogContext.Provider
            value={{
                open,
                setOpen,
                fullname,
                setFullname,
                phone,
                setPhone,
                role,
                setRole,
                adminId,
                setAdminId,
                permissions,
                setPermissions,
                handleClearContext,
            }}
        >
            {children}
        </AdminEditDialogContext.Provider>
    )
}

export default AdminEditDialogContextProvider
