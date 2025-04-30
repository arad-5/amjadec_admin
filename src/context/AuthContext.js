// context/AuthContext.js

'use client'

import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/utils/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios
                    .get('/admin/auth/admin-profile')
                    .then(async (res) => {
                        // console.log(res)
                        const { data } = res
                        data.success && setAdmin(data.admin)
                    })
                    .catch((err) => {
                        setAdmin(null)
                        router.push('/login')
                        console.log(err.message)
                    })
            } catch (error) {
                console.error('Auth Check Error:', error)
                setAdmin(null)
                router.push('/login')
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [router])
    useEffect(() => {
        console.log(admin)
    }, [admin])

    return (
        <AuthContext.Provider value={{ admin, setAdmin }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
