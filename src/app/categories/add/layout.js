'use client'
import CategoryContextProvider from './context/CategoryContextProvider'

export default function Layout({ children }) {
    return <CategoryContextProvider>{children}</CategoryContextProvider>
}
