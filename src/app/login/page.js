'use client'

import axios from '@/utils/axios'
import { useState } from 'react'
import SendOtpForm from './components/SendOtpForm'
import { Alert, Typography } from '@mui/material'
import VerifyOtpForm from './components/VerifyOtpForm'
import Logo from '@/components/Logo'

export default function AdminLoginPage() {
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [step, setStep] = useState(1) // 1 = phone step, 2 = OTP step
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    return (
        <div className="w-full flex flex-col justify-center items-center px-6">
            <div className="max-w-96">
                <div className="w-full flex flex-col items-center">
                    <span className="text-sm -mb-3 block">شهر الکترونیک</span>
                    <Logo className="w-[80px] h-[80px]" />
                </div>
                <Typography
                    variant="h5"
                    component="h1"
                    fontWeight={'bold'}
                    gutterBottom
                    marginBottom={3}
                >
                    ورود
                </Typography>
                {step === 1 ? (
                    <SendOtpForm
                        phone={phone}
                        setPhone={setPhone}
                        error={error}
                        setError={setError}
                        setStep={setStep}
                    />
                ) : null}

                {step === 2 ? (
                    <VerifyOtpForm phone={phone} setError={setError} />
                ) : null}

                {error && <Alert severity="error">{error}</Alert>}
            </div>
        </div>
    )
}
