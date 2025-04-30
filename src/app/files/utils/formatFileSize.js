const formatFileSize = (size) => {
    if (size < 1024) {
        return size + ' بایت'
    } else if (size < 1024 * 1024) {
        return Math.round(size / 1024) + ' کیلوبایت'
    } else {
        return Math.round(size / (1024 * 1024)) + ' مگابایت'
    }
}
export default formatFileSize
