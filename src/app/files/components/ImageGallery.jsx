import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Pagination,
    IconButton,
    Menu,
    MenuItem,
    Skeleton,
    Tooltip,
    useTheme,
} from '@mui/material'

import LoopIcon from '@mui/icons-material/Loop'

import moment from 'moment-jalaali'

import ImageCard from './ImageCard'
import { cn } from '@/utils/cn'

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false })

const ImageGallery = ({
    images,
    limit,
    handleRefresh,
    loading,
    totalPages,
    page,
    setPage,
}) => {
    const theme = useTheme()

    // تغییر صفحه در کامپوننت Pagination
    const handlePageChange = (event, value) => {
        setPage(value)
    }

    // اسکلتون‌ها برای حالت بارگذاری
    const skeletonArray = Array.from({ length: limit }, (_, i) => i)

    return (
        <Box
            p={2}
            sx={{
                position: 'relative',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            {/* هدر بالا */}
            <Box
                mb={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                {/* دکمه آیکونی رفرش + تولتیپ */}
                <Tooltip title={'بروزرسانی'}>
                    <IconButton
                        size="large"
                        sx={{
                            marginLeft: 2,
                        }}
                        onClick={handleRefresh}
                    >
                        <LoopIcon
                            className={cn(loading ? 'animate-spin' : '')}
                        />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* گرید تصاویر یا اسکلتون‌ها */}
            <Grid container spacing={2}>
                {loading
                    ? skeletonArray.map((item) => (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                              <Card
                                  sx={{
                                      p: 2,
                                      borderRadius: 2,
                                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                  }}
                              >
                                  <Skeleton
                                      variant="rectangular"
                                      width="100%"
                                      height={200}
                                      sx={{ mb: 2, borderRadius: 1 }}
                                  />
                                  <Skeleton variant="text" width="60%" />
                                  <Skeleton variant="text" width="80%" />
                              </Card>
                          </Grid>
                      ))
                    : images.map((file) => (
                          <Grid
                              item
                              xs={12}
                              sm={6}
                              md={4}
                              lg={3}
                              key={file._id}
                          >
                              <ImageCard file={file} />
                          </Grid>
                      ))}
            </Grid>

            {/* صفحه‌بندی چسبان در انتهای صفحه */}
            <Box
                sx={{
                    position: 'sticky',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    mt: 2,
                    py: 2,
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 99,
                    borderTop: '1px solid #ddd',
                }}
            >
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    )
}

export default ImageGallery
