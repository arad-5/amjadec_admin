const { createContext, useState } = require('react')

export const FileUploadDialogContext = createContext()

const FileUploadDialogContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    return (
        <FileUploadDialogContext.Provider value={{ open, setOpen }}>
            {children}
        </FileUploadDialogContext.Provider>
    )
}

export default FileUploadDialogContextProvider
