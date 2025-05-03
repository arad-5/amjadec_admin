import { Box, Typography, Grid, Paper, Divider, Stack } from '@mui/material'
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone'
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone'
import QuizTwoToneIcon from '@mui/icons-material/QuizTwoTone'
import { useEffect, useState } from 'react'
import axiosInstance from '@/utils/axios'

const CardStats = ({ icon, title, total, stats, gradient }) => (
    <Paper
        elevation={4}
        sx={{
            p: 3,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
            color: '#fff',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
            },
        }}
    >
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Box
                sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {icon}
            </Box>
            <Box>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ lineHeight: 1 }}
                >
                    {total}
                </Typography>
                <Typography variant="subtitle2">{title}</Typography>
            </Box>
        </Stack>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)' }} />
        <Box mt={2}>
            {stats.map((s, idx) => (
                <Box
                    key={idx}
                    display="flex"
                    justifyContent="space-between"
                    p={1}
                    sx={{
                        borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        mb: 1,
                        fontSize: '0.9rem',
                    }}
                >
                    <Typography>{s.label}</Typography>
                    <Typography fontWeight="bold">{s.value}</Typography>
                </Box>
            ))}
        </Box>
    </Paper>
)

const ShopStats = () => {
    const [stats, setStats] = useState(null)

    const fetchStats = async () => {
        try {
            const res = await axiosInstance.get('/admin/dashboard/stats')
            setStats(res.data)
        } catch (err) {
            console.error('خطا در گرفتن آمار:', err)
        }
    }

    useEffect(() => {
        fetchStats()
    }, [])

    const productStats = stats?.products || {}
    const categoryStats = stats?.categories || {}

    if (!stats) return <Typography>در حال بارگذاری آمار...</Typography>

    return (
        <Box sx={{ mb: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <CardStats
                        icon={
                            <CategoryTwoToneIcon
                                sx={{ fontSize: 36, color: '#fff' }}
                            />
                        }
                        title="محصولات"
                        total={productStats.total || 0}
                        gradient={['#ff7e5f', '#feb47b']}
                        stats={[
                            {
                                label: 'فعال',
                                value: productStats.published || 0,
                            },
                            {
                                label: 'تایید نشده',
                                value: productStats.unconfirmed || 0,
                            },
                            {
                                label: 'ناقص',
                                value: productStats.incomplete || 0,
                            },
                        ]}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <CardStats
                        icon={
                            <GridViewTwoToneIcon
                                sx={{ fontSize: 36, color: '#fff' }}
                            />
                        }
                        title="دسته‌بندی‌ها"
                        total={categoryStats.total || 0}
                        gradient={['#6a11cb', '#2575fc']}
                        stats={[
                            { label: 'اصلی', value: categoryStats.main || 0 },
                            {
                                label: 'ریشه‌ای',
                                value: categoryStats.root || 0,
                            },
                        ]}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <CardStats
                        icon={
                            <QuestionAnswerTwoToneIcon
                                sx={{ fontSize: 36, color: '#fff' }}
                            />
                        }
                        title="نظرات"
                        total="0"
                        gradient={['#43cea2', '#185a9d']}
                        stats={[
                            { label: 'فعال', value: '0' },
                            { label: 'تایید نشده', value: '0' },
                        ]}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <CardStats
                        icon={
                            <QuizTwoToneIcon
                                sx={{ fontSize: 36, color: '#fff' }}
                            />
                        }
                        title="سوالات"
                        total="0"
                        gradient={['#ff512f', '#dd2476']}
                        stats={[
                            { label: 'تایید شده', value: '0' },
                            { label: 'بدون پاسخ', value: '0' },
                            { label: 'تایید نشده', value: '0' },
                        ]}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
export default ShopStats
