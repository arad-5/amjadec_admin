'use client'

import { CardContent, IconButton, Tooltip, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useContext, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import { CategoryEditContext } from '../../context/CategoryEditContextProvider'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/navigation'
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import CheckIcon from '@mui/icons-material/Check'

import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'
import { CategoryDeleteContext } from '../../context/CategoryDeleteContextProvider'

const Category = ({ category, setDialogData, expanded, setExpanded }) => {
    const [isActionsVisibale, setIsActionsVisibale] = useState(false)
    const { open, setOpen, selectedCategory, setSelectedCategory } =
        useContext(CategoryEditContext)
    const {
        setOpen: setCategoryDeleteDialog,
        setTitle: setCategoryDeleteDialogTitle,
        setCategoryId: setDeleteCategoryDialogId,
    } = useContext(CategoryDeleteContext)
    const router = useRouter()
    const [copiedCategoryId, setCopiedCategoryId] = useState(null)

    const handleEditDialog = () => {
        setOpen(true)
        setSelectedCategory(category)
    }
    const handleCopyId = async (id) => {
        try {
            await navigator.clipboard.writeText(id)
            setCopiedCategoryId(id)
            setTimeout(() => {
                setCopiedCategoryId(null)
            }, 2000)
        } catch {
            alert('متأسفانه کپی شناسه انجام نشد!')
        }
    }
    const handleDeleteCategory = (category) => {
        setCategoryDeleteDialog(true)
        setCategoryDeleteDialogTitle(category.title)
        setDeleteCategoryDialogId(category._id)
    }
    return (
        <CardContent
            onMouseOver={() => setIsActionsVisibale(true)}
            onMouseOut={() => setIsActionsVisibale(false)}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <Box>
                    <CategoryTwoToneIcon
                        sx={{ fontSize: '2rem' }}
                        color="warning"
                    />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{category.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {category.description}
                    </Typography>
                </Box>
                {isActionsVisibale ? (
                    <Stack direction="row" spacing={1}>
                        <Box>
                            <Tooltip title="کپی شناسه">
                                <IconButton
                                    sx={{
                                        marginRight: 1,
                                    }}
                                    onClick={() => handleCopyId(category._id)}
                                    size="small"
                                >
                                    {copiedCategoryId === category._id ? (
                                        <CheckIcon
                                            fontSize="small"
                                            color="success"
                                        />
                                    ) : (
                                        <ContentCopyTwoToneIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="افزودن زیر مچموعه">
                                <IconButton
                                    sx={{
                                        marginRight: 1,
                                    }}
                                    size="small"
                                    onClick={() =>
                                        router.push(
                                            `/categories/add?parent=${category._id}`
                                        )
                                    }
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="تغییر">
                                <IconButton
                                    sx={{
                                        marginRight: 1,
                                    }}
                                    size="small"
                                    onClick={() => handleEditDialog()}
                                >
                                    <ModeEditTwoToneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="حذف">
                                <IconButton
                                    sx={{
                                        marginRight: 1,
                                    }}
                                    variant="outlined"
                                    size="small"
                                    onClick={() => {
                                        handleDeleteCategory(category)
                                    }}
                                >
                                    <DeleteTwoToneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="زیرمجموعه">
                                <IconButton
                                    sx={{
                                        marginRight: 1,
                                    }}
                                    size="small"
                                    onClick={() => setExpanded((curr) => !curr)}
                                >
                                    {expanded ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Stack>
                ) : null}
            </Stack>
        </CardContent>
    )
}

export default Category
