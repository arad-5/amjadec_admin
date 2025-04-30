// src/theme.js
import { createTheme } from '@mui/material/styles'
import localFont from 'next/font/local'

const yekanVF = localFont({
    src: './fonts/IRANYekanXVFaNumVF.woff2',
    display: 'swap',
})
const theme = createTheme({
    direction: 'rtl', // Set the direction to 'rtl'
    typography: {
        fontFamily: yekanVF.style,
    },
})

export default theme
