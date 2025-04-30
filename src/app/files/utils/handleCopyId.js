const handleCopyId = async (id) => {
    try {
        await navigator.clipboard.writeText(id)
        setCopiedFileId(id)
        setTimeout(() => {
            setCopiedFileId(null)
        }, 2000)
    } catch {
        alert('متأسفانه کپی شناسه انجام نشد!')
    }
}
export default handleCopyId
