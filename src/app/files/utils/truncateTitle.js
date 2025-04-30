const truncateTitle = (title, maxLength = 20) => {
    if (!title) return ''
    return title.length > maxLength
        ? title.substring(0, maxLength) + '...'
        : title
}
export default truncateTitle
