import * as React from 'react'

import ImageSelectionDialog from '@/components/images/ImageSelectionDialog'
import ImagesSelect from './ImagesSelect'
import ImagesSwiper from './ImagesSwiper'
import { useState } from 'react'
import { useContext } from 'react'
import { ProductContext } from '../context/ProductContextProvider'
import ImagePreviewerCard from '@/components/images/ImagePreviewerCard'
import { Box } from '@mui/material'
export default function ProductImages() {
    const { mainImage, setMainImage } = useContext(ProductContext)
    const { images, setImages } = useContext(ProductContext)

    return (
        <Box className="bg-white w-full pl-4 p-4 rounded-lg shadow-md">
            <div className="pb-3 mb-3 border-b">
                <span className="text-lg font-semibold">عکس های محصول</span>
            </div>
            <div className="flex gap-4 w-full overflow-x-auto">
                <ImageSelectionDialog
                    selectedImage={mainImage}
                    setSelectedImage={setMainImage}
                />
                {images.map((image, index) => (
                    <ImagePreviewerCard
                        key={image._id}
                        image={image}
                        index={index + 2}
                        closeHandler={() => {
                            setImages((prev) =>
                                prev.filter((item) => item._id !== image._id)
                            )
                        }}
                    />
                ))}
                <ImagesSelect />
            </div>
        </Box>
    )
}
