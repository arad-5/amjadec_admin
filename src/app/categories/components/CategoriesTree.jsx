import React, { useState } from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    List,
    ListItem,
    Skeleton,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Category from './Category'

const NestedAccordion = ({ category }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <Accordion
            sx={{
                padding: 0,
                paddingY: 0,
            }}
            expanded={expanded}

            // onChange={() => setExpanded(!expanded)}
        >
            <AccordionSummary
                sx={{
                    padding: 0,
                }}
            >
                <div className="w-full">
                    <Category
                        category={category}
                        expanded={expanded}
                        setExpanded={setExpanded}
                    />
                </div>
            </AccordionSummary>
            <AccordionDetails>
                {category.children.length > 0 ? (
                    category.children.map((child) => (
                        <NestedAccordion key={child._id} category={child} />
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        هیچ زیر دسته بندی ای وجود ندارد
                    </Typography>
                )}
            </AccordionDetails>
        </Accordion>
    )
}

const CategoriesTree = ({ loading, categories }) => {
    return (
        <div className="p-4">
            {loading ? (
                <List sx={{ padding: 0 }}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <ListItem key={i} sx={{ padding: 0, marginBottom: 2 }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    padding: 2,
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton
                                    animation="wave"
                                    height={50}
                                    width={50}
                                    variant="circular"
                                    sx={{ transform: 'unset' }}
                                />

                                <Box marginLeft={2}>
                                    <Skeleton
                                        animation="wave"
                                        height={30}
                                        width={180}
                                        sx={{
                                            transform: 'unset',
                                            marginBottom: 2,
                                        }}
                                    />
                                    <Skeleton
                                        animation="wave"
                                        height={20}
                                        width={180}
                                        sx={{ transform: 'unset' }}
                                    />
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            ) : (
                categories.map((category) => (
                    <NestedAccordion key={category._id} category={category} />
                ))
            )}
        </div>
    )
}

export default CategoriesTree
