import {
    Box,
    Chip,
    CircularProgress,
    Divider,
    IconButton,
    Typography,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import LinkIcon from '@mui/icons-material/Link'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ImageNotSupportedTwoToneIcon from '@mui/icons-material/ImageNotSupportedTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'

const ProductCard = ({ product }) => {
    const isIncomplete = product.status === 'incomplete'
    const [isPartnumberCopied, setIsPartnumberCopied] = useState(false)
    const handleCopyId = async (id) => {
        try {
            await navigator.clipboard.writeText(id)
            setIsPartnumberCopied(true)
            setTimeout(() => setIsPartnumberCopied(false), 2000)
        } catch {
            alert('متأسفانه کپی شناسه انجام نشد!')
        }
    }
    return (
        <Box
            position={'relative'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div className="flex justify-between">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: isIncomplete
                                ? '#ffedd5'
                                : '#dcfce7',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '100%',
                            marginRight: 1,
                        }}
                        width={30}
                        height={30}
                    >
                        <Box
                            sx={{
                                backgroundColor: isIncomplete
                                    ? '#f97316'
                                    : '#22c55e',
                                borderRadius: '100%',
                            }}
                            width={15}
                            height={15}
                        ></Box>
                    </Box>

                    {product.status === 'incomplete' ? (
                        <Chip
                            color="warning"
                            variant="outlined"
                            label="ناقص"
                            size="small"
                            sx={{
                                backgroundColor: '#fff',
                            }}
                        />
                    ) : null}
                </Box>
                <div className=" flex flex-col items-start ">
                    <Edit product={product} />
                </div>
            </div>
            <div className="flex items-center justify-center mb-2">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    height={140}
                    width={'100%'}
                    position={'relative'}
                >
                    {product?.mainImage ? (
                        <Image
                            src={product.mainImage.url}
                            alt=""
                            layout="fill"
                            objectFit="contain"
                        />
                    ) : (
                        <Box textAlign={'center'}>
                            <ImageNotSupportedTwoToneIcon />
                            <Typography fontSize={'0.8rem'}>
                                بدون تصویر
                            </Typography>
                        </Box>
                    )}
                </Box>
            </div>
            <div className="flex flex-col items-start ">
                <div className="mb-2 flex items-start w-full flex-wrap overflow-hidden">
                    {product.partNumber ? (
                        <Tooltip
                            className="flex-shrink "
                            title={
                                isPartnumberCopied ? 'کپی شد' : `کپی پارت نامبر`
                            }
                            placement="left"
                            onClick={() => handleCopyId(product.partNumber)}
                        >
                            <Chip
                                label={product.partNumber}
                                clickable
                                variant="outlined"
                                size="small"
                            />
                        </Tooltip>
                    ) : (
                        <Typography
                            color="warning"
                            fontWeight={'500'}
                            fontSize={'0.8rem'}
                        >
                            بدون پارت نامبر
                        </Typography>
                    )}
                </div>
                <Box
                    sx={{
                        textAlign: 'start',
                    }}
                >
                    <Typography
                        fontSize={'0.8rem'}
                        fontWeight={'400'}
                        color={product?.title ? '#303030' : 'warning'}
                    >
                        {product?.title ? product.title : 'بدون عنوان!'}
                    </Typography>
                </Box>
                <Divider
                    sx={{
                        width: '100%',
                        marginY: 1,
                    }}
                />
                <Box className="flex justify-between w-full items-center">
                    <div className="">
                        {(() => {
                            switch (product.stockStatus) {
                                case 'in_stock':
                                    return (
                                        <div>
                                            <Inventory2TwoToneIcon
                                                style={{
                                                    fontSize: '1.1rem',
                                                    marginLeft: '0.3rem',
                                                }}
                                            />
                                            <span className="font-semibold">
                                                {product.stockQuantity}
                                            </span>
                                        </div>
                                    )

                                case 'out_of_stock':
                                    return (
                                        <Chip
                                            label="ناموجود"
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                        />
                                    )

                                case 'contact':
                                    break
                                default:
                                // console.log(`Sorry, we are out of ${expr}.`)
                            }
                        })()}
                    </div>
                    <div className="font-medium">
                        <span className="ml-1">
                            {formatPrice(product.price)}
                        </span>
                        <span className="text-xs">ت</span>
                    </div>
                </Box>
            </div>
        </Box>
    )
}

export default ProductCard

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Link from 'next/link'
import formatPrice from '@/utils/formatPrice'
import { ProductDeleteDialogContext } from '../../context/ProductDeleteDialogContextProvider'
function Edit({ product }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <React.Fragment>
            <IconButton
                aria-label="view"
                color="inherit"
                size="small"
                sx={{
                    background: '#fff',
                    ':hover': {
                        background: '#fff',
                    },
                }}
                onClick={handleClick}
            >
                <MoreVertIcon fontSize="medium" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,

                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                left: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    onClick={handleClose}
                    sx={{
                        fontSize: '0.9rem',
                        padding: 0,
                    }}
                >
                    <Link
                        className="w-full px-4 py-2 "
                        href={'/products/edit/' + product._id}
                    >
                        <EditOutlinedIcon
                            sx={{ marginRight: 1, fontSize: '1.2rem' }}
                        />
                        ویرایش
                    </Link>
                </MenuItem>
                {/* <MenuItem
                    onClick={handleClose}
                    sx={{
                        fontSize: '0.9rem',
                    }}
                >
                    <LinkIcon sx={{ marginRight: 1 }} />
                    کپی لینک
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    sx={{
                        fontSize: '0.9rem',
                    }}
                >
                    <VisibilityTwoToneIcon sx={{ marginRight: 1 }} />
                    مشاهده
                </MenuItem> */}
                <DeleteItem product={product} />
            </Menu>
        </React.Fragment>
    )
}

const DeleteItem = ({ product }) => {
    const { setOpen, setProduct } = useContext(ProductDeleteDialogContext)

    const handleDeleteDialog = async () => {
        setOpen(true)
        setProduct(product)
    }

    return (
        <MenuItem
            onClick={handleDeleteDialog}
            sx={{
                fontSize: '0.9rem',
            }}
        >
            <DeleteTwoToneIcon sx={{ marginRight: 1 }} />
            حذف
        </MenuItem>
    )
}
