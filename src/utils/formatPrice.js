const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price)

export default formatPrice
