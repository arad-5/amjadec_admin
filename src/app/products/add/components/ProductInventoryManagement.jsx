import React, { useContext, useState } from 'react'
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    Stack,
    Grid,
} from '@mui/material'
import { ProductContext } from '../context/ProductContextProvider'

const ProductInventoryManagement = () => {
    const {
        stockStatus,
        setStockStatus,
        stockQuantity,
        setStockQuantity,
        lowStockThreshold,
        setLowStockThreshold,
    } = useContext(ProductContext)

    const [restockDate, setRestockDate] = useState(null)

    const handleSave = () => {
        // Save logic here (API call or state update)
        console.log({
            stockStatus,
            stockQuantity,
            lowStockThreshold,
            restockDate,
        })
        alert('Inventory changes saved!')
    }

    return (
        <div className="rounded-lg shadow-md bg-white p-4 mb-4">
            <div className="pb-3 mb-6 border-b">
                <span className="text-lg font-semibold">مدیریت انبار</span>
            </div>
            <Grid container spacing={3}>
                {/* Stock Status */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="وضعیت انبار"
                        select
                        fullWidth
                        value={stockStatus}
                        onChange={(e) => setStockStatus(e.target.value)}
                    >
                        <MenuItem value="in_stock">موجود</MenuItem>
                        <MenuItem value="out_of_stock">ناموجود</MenuItem>
                        <MenuItem value="pre_order">استعلامی</MenuItem>
                    </TextField>
                </Grid>

                {/* stockQuantity */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="تعداد موجودی"
                        type="number"
                        fullWidth
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        inputProps={{ min: 0 }}
                    />
                </Grid>

                {/* Low Stock Threshold */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="تعداد اعلامی موجودی کم"
                        type="number"
                        fullWidth
                        value={lowStockThreshold}
                        onChange={(e) => setLowStockThreshold(e.target.value)}
                        inputProps={{ min: 0 }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductInventoryManagement
