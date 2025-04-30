import React, { createContext, useEffect, useState } from 'react'
export const FileDeleteDialogContext = createContext()

const FileDeleteDialogContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState({})
    useEffect(() => {
        console.log(open, file)
    }, [open, file])

    return (
        <FileDeleteDialogContext.Provider
            value={{
                open,
                setOpen,
                file,
                setFile,
            }}
        >
            {children}
        </FileDeleteDialogContext.Provider>
    )
}

export default FileDeleteDialogContextProvider
