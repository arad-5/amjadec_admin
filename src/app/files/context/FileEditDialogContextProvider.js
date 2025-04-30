import React, { createContext, useState } from 'react'
export const FileEditDialogContext = createContext()

const FileEditDialogContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [fileId, setFileId] = useState(null)
    const [oldType, setOldType] = useState(null)
    const [currentFileUrl, setCurrentFileUrl] = useState(null)
    const [file, setFile] = useState({})
    return (
        <FileEditDialogContext.Provider
            value={{
                open,
                setOpen,
                fileId,
                setFileId,
                oldType,
                setOldType,
                currentFileUrl,
                setCurrentFileUrl,
                file,
                setFile,
            }}
        >
            {children}
        </FileEditDialogContext.Provider>
    )
}

export default FileEditDialogContextProvider
