import React from 'react'
import { Box, Chip, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import Image from 'next/image'
import { cn } from '@/utils/cn'

const ImagePreviewerCard = ({
    image,
    index,
    closeHandler,
    className,
    topLabel,
}) => {
    return (
        <Box
            key={image._id}
            className={cn('p-4 rounded-lg shrink-0 bg-neutral-50 ', className)}
            position={'relative'}
            sx={{
                width: 'calc(240px + 2rem)',
            }}
        >
            {index || topLabel ? (
                <div className="flex items-center">
                    {index ? (
                        <Box
                            sx={{ height: '2rem', width: '2rem' }}
                            className="!bg-white flex items-center justify-center rounded-full ml-2"
                        >
                            <span className="text-md font-semibold">
                                {index}
                            </span>
                        </Box>
                    ) : null}
                    {topLabel ? topLabel : null}
                </div>
            ) : null}
            {closeHandler ? (
                <IconButton
                    color="inherit"
                    size="small"
                    onClick={closeHandler}
                    sx={{
                        position: 'absolute',
                        right: '1rem',
                        top: '1rem',
                        background: '#fff',
                        ':hover': {
                            background: '#fff',
                        },
                        zIndex: 10,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}

            <div className="mb-3">
                <Image
                    height={240}
                    width={240}
                    src={image.url}
                    alt={image.filename}
                />
            </div>
            <Typography
                variant="body2"
                sx={{ wordBreak: 'break-all', maxWidth: '240px' }}
            >
                {image.filename}
            </Typography>
        </Box>
    )
}

export default ImagePreviewerCard
