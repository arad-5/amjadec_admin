import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { IconButton, Tooltip } from '@mui/material'

export default function QuestionDeleteModal({ labled }) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Tooltip title="حذف">
                {labled ? (
                    <Button
                        variant="contained"
                        endIcon={<DeleteTwoToneIcon />}
                        color="error"
                        onClick={handleOpen}
                    >
                        حذف
                    </Button>
                ) : (
                    <IconButton
                        aria-label="delete"
                        color="error"
                        size="medium"
                        onClick={handleOpen}
                    >
                        <DeleteTwoToneIcon fontSize="inherit" />
                    </IconButton>
                )}
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-white max-w-[400px] w-full p-4 px-6 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        آیا از حذف این سوال مطمئن هستید؟
                    </Typography>
                    <Box sx={{ my: 2 }} className="bg-[#f0f0f0] p-2 rounded-md">
                        <Typography>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                        </Typography>
                    </Box>
                    <Box className="flex justify-end">
                        <Button
                            color="inherit"
                            className="!ml-3"
                            onClick={handleClose}
                        >
                            لغو
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<DeleteTwoToneIcon />}
                            color="error"
                        >
                            حذف
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
