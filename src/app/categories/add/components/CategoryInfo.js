import {
    Box,
    Button,
    FormControlLabel,
    IconButton,
    Switch,
    TextField,
} from '@mui/material'
import React, { useContext } from 'react'
import { CategoryContext } from '../context/CategoryContextProvider'
import ImagePickerCard from '@/components/images/ImageSelectionDialog'

const CategoryInfo = ({ parentId }) => {
    const {
        title,
        description,
        slug,
        isMain,
        parent,
        setTitle,
        setDescription,
        setSlug,
        setIsMain,
        setParent,
        image,
        setImage,
    } = useContext(CategoryContext)
    return (
        <div className="col-span-6 pl-4 bg-white p-4 rounded-lg shadow-md ">
            <div className="pb-3 mb-3 border-b">
                <span className="text-lg font-semibold">مشخصات دسته بندی</span>
            </div>
            {/* <Button variant="contained">انتخاب عکس</Button> */}

            <div className="">
                <Box sx={{ marginBottom: 3, display: 'inline-block' }}>
                    <ImagePickerCard
                        selectedImage={image}
                        setSelectedImage={setImage}
                    />
                </Box>
                <form className="flex flex-col gap-4 mb-4">
                    <TextField
                        id="outlined-basic"
                        label="عنوان"
                        variant="outlined"
                        fullWidth
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="نام انگلیسی"
                        variant="outlined"
                        fullWidth
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="توضیحات"
                        variant="outlined"
                        fullWidth
                        multiline
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </form>
            </div>
        </div>
    )
}

export default CategoryInfo
