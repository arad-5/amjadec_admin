import React, { useContext, useState } from 'react'
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Grid,
    Divider,
    Switch,
    FormControlLabel,
} from '@mui/material'
import { EditProductContext } from '../context/EditProductContextProvider'

const ProductPriceManagement = () => {
    const {
        price,
        setPrice,
        isDiscountActive,
        setIsDiscountActive,
        discountPrice,
        setDiscountPrice,
    } = useContext(EditProductContext)

    // Format numbers with commas for readability
    const formatPrice = (price) =>
        new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(
            price
        )

    // Calculate the discount percentage
    const calculateDiscountPercentage = () => {
        if (!isDiscountActive || !discountPrice || discountPrice >= price)
            return 0
        return (((price - discountPrice) / price) * 100).toFixed(2)
    }

    const handleSave = () => {
        console.log({
            price,
            discountPrice: isDiscountActive ? discountPrice : null,
            isDiscountActive,
            discountPercentage: calculateDiscountPercentage(),
        })
        alert('Pricing changes saved!')
    }

    return (
        <div className="rounded-lg shadow-md bg-white p-4 mb-4">
            <div className="pb-3 mb-6 border-b">
                <span className="text-lg font-semibold">قیمت</span>
            </div>

            <Grid container spacing={3}>
                {/* Base Price */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="قیمت پایه"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={(e) =>
                            setPrice(parseFloat(e.target.value) || 0)
                        }
                        inputProps={{ min: 0 }}
                        helperText={`${formatPrice(price)} تومان`}
                    />
                </Grid>

                {/* Discount Toggle */}
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isDiscountActive}
                                onChange={(e) =>
                                    setIsDiscountActive(e.target.checked)
                                }
                            />
                        }
                        label="فعال سازی تخفیف"
                    />
                </Grid>

                {/* Discount Price */}
                {isDiscountActive && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="قیمت تخفیف"
                            type="number"
                            fullWidth
                            value={discountPrice}
                            onChange={(e) =>
                                setDiscountPrice(
                                    parseFloat(e.target.value) || 0
                                )
                            }
                            inputProps={{ min: 0 }}
                            helperText={`${formatPrice(discountPrice)} تومان`}
                        />
                    </Grid>
                )}

                {/* Discount Percentage */}
                {isDiscountActive && (
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ marginTop: 2 }}>
                            <Typography variant="body1">
                                درصد تخفیف: {calculateDiscountPercentage()}%
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default ProductPriceManagement
