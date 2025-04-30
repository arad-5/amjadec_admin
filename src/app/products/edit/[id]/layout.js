'use client'
import EditProductContextProvider from './context/EditProductContextProvider'

export default function Layout({ children }) {
    return <EditProductContextProvider>{children}</EditProductContextProvider>
}
