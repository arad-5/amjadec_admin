import axios from '@/utils/axios'
import { Button, TextField, Typography } from '@mui/material'
import { Box, Grid } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import EastIcon from '@mui/icons-material/East'
import axiosInstance from '@/utils/axios'

const VerifyOtpForm = ({ phone, setError }) => {
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(null)
    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError('')
            await axiosInstance
                .post(
                    `/admin/auth/verify-otp`,
                    { phone, otp },
                    {
                        withCredentials: true,
                    }
                )
                .catch((err) => {
                    console.dir(err)
                    throw new Error(
                        err?.response?.data?.message || 'Failed to send OTP'
                    )
                })
                .then((res) => {
                    console.log(res)
                    const {
                        data: { token },
                    } = res

                    if (token) {
                        localStorage.setItem('adminToken', token)

                        // Cookies.set('admin-token', token, { expires: 1 })
                        window.location.href = '/'
                    } else {
                        throw new Error('احراز هویت موفقیت آمیز نبود!')
                    }
                })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box marginBottom={3}>
            <form onSubmit={handleVerifyOtp}>
                <Typography
                    variant="body1"
                    gutterBottom
                    align="center"
                    marginBottom={3}
                >
                    لطفا کد ارسال شده به شماره <strong>{phone}</strong> را وارد
                    کنید{' '}
                </Typography>

                <TextField
                    id="filled-basic"
                    label="کد ورود"
                    variant="filled"
                    fullWidth
                    className="!mb-3"
                    value={otp || ''}
                    type="number"
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <Button
                    type="submit"
                    startIcon={<EastIcon />}
                    loading={loading}
                    loadingPosition="start"
                    variant="contained"
                    fullWidth
                    size="large"
                >
                    {loading ? 'ارسال' : 'تایید'}
                </Button>
            </form>
        </Box>
    )
}

export default VerifyOtpForm
