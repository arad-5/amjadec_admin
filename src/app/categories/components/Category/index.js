'use client'
import { Delete, Edit, PlusOne } from '@mui/icons-material'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    IconButton,
    Typography,
} from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useContext, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Add from '@mui/icons-material/Add'
import Link from 'next/link'
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import { CategoryEditContext } from '../../context/CategoryEditContextProvider'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/navigation'
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'

const Category = ({ category, setDialogData, expanded, setExpanded }) => {
    const [isActionsVisibale, setIsActionsVisibale] = useState(false)
    const { open, setOpen, selectedCategory, setSelectedCategory } =
        useContext(CategoryEditContext)

    const router = useRouter()

    const handleEditDialog = () => {
        setOpen(true)
        setSelectedCategory(category)
    }
    return (
        <div className="">
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
                            <IconButton
                                onClick={() =>
                                    router.push(
                                        `/categories/add?parent=${category._id}`
                                    )
                                }
                                sx={{
                                    mr: 2,
                                }}
                            >
                                <AddIcon />
                            </IconButton>

                            <Box>
                                <IconButton
                                    size="small"
                                    onClick={() => handleEditDialog()}
                                    sx={{
                                        mr: 2,
                                    }}
                                >
                                    <ModeEditTwoToneIcon />
                                </IconButton>
                                <IconButton
                                    variant="outlined"
                                    size="small"
                                    onClick={() => {}}
                                    sx={{
                                        mr: 2,
                                    }}
                                >
                                    <DeleteTwoToneIcon />
                                </IconButton>{' '}
                                <IconButton
                                    onClick={() => setExpanded((curr) => !curr)}
                                >
                                    {expanded ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </IconButton>{' '}
                            </Box>
                        </Stack>
                    ) : null}
                </Stack>
            </CardContent>
        </div>
    )
}

export default Category
