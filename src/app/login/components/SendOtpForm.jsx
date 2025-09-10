import axios from '@/utils/axios'
import { Alert, Button, TextField, Typography } from '@mui/material'

import { useState } from 'react'
import EastIcon from '@mui/icons-material/East'
import { enqueueSnackbar } from 'notistack'
import axiosInstance from '@/utils/axios'

const SendOtpForm = ({ phone, setPhone, setError, setStep }) => {
    const [loading, setLoading] = useState(false)
    const handleSendOtp = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError('')
            await axiosInstance
                .post(
                    `/admin/auth/send-otp`,
                    { phone },
                    { withCredentials: true }
                )
                .catch((err) => {
                    console.error(err)
                    throw new Error(
                        err?.response?.data?.message || 'Failed to send OTP'
                    )
                })
                .then((res) => console.log(res))

            // If successful, move to step 2
            setStep(2)
        } catch (err) {
            enqueueSnackbar({
                variant: 'error',
                message: err.message,
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <form onSubmit={handleSendOtp} className="mb-4">
                <TextField
                    label="شماره موبایل"
                    variant="filled"
                    fullWidth
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثل ۰۹۱۲۱۲۳۴۵۶۷"
                    className="!mb-3"
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
                    {loading ? 'در حال ارسال' : 'تایید'}
                </Button>
            </form>
        </div>
    )
}

export default SendOtpForm
