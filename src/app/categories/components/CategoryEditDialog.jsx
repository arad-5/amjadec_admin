import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Alert,
} from '@mui/material'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { CategoryEditContext } from '../context/CategoryEditContextProvider'
import axiosInstance from '@/utils/axios'
import CircularProgress from '@mui/material/CircularProgress'
import { enqueueSnackbar } from 'notistack'
import ImagePickerCard from '@/components/images/ImageSelectionDialog'

export default function CategoryEditDialog({ onUpdate }) {
    const { open, setOpen, selectedCategory, setSelectedCategory } =
        useContext(CategoryEditContext)
    const [image, setImage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        slug: '',
        description: '',
    })

    useEffect(() => {
        if (selectedCategory) {
            setForm({
                title: selectedCategory.title || '',
                slug: selectedCategory.slug || '',
                description: selectedCategory.description || '',
            })
            setImage(selectedCategory.image)
        }
        console.log(selectedCategory)
    }, [selectedCategory])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }
    const handleClose = () => {
        setOpen(false)
        setSelectedCategory(null)
    }
    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.put(
                `/admin/categories/${selectedCategory._id}`,
                { ...form, image: image?._id }
            )
            if (onUpdate) onUpdate()
            handleClose()
            enqueueSnackbar('ویرایش دسته بندی موفق آمیز بود', {
                variant: 'success',
            })
        } catch (err) {
            const message = err.response?.data?.message
            if (message) {
                setErrorMessage(message)
            } else {
                setErrorMessage(err.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} handleClose={() => handleClose()} fullWidth>
            <DialogTitle>ویرایش دسته‌بندی</DialogTitle>
            <DialogContent>
                <ImagePickerCard
                    selectedImage={image}
                    setSelectedImage={setImage}
                />
                <TextField
                    margin="dense"
                    label="عنوان"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="نام انگلیسی (Slug)"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="توضیحات"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ marginBottom: 2 }}
                />{' '}
                {errorMessage ? (
                    <Alert severity="error">خطا: {errorMessage}</Alert>
                ) : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>بستن</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    {loading ? (
                        <CircularProgress
                            size={'1.2rem'}
                            sx={{ marginRight: 2 }}
                            color="#fff"
                        />
                    ) : null}
                    ذخیره تغییرات
                </Button>
            </DialogActions>
        </Dialog>
    )
}
