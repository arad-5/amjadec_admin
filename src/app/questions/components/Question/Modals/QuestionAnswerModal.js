import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Tooltip } from '@mui/material'

import SubdirectoryArrowLeftTwoToneIcon from '@mui/icons-material/SubdirectoryArrowLeftTwoTone'

export default function QuestionAnswerModal({ labled }) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Tooltip title="تایید">
                <Button
                    endIcon={
                        <SubdirectoryArrowLeftTwoToneIcon fontSize="inherit" />
                    }
                    onClick={handleOpen}
                >
                    پاسخ
                </Button>
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
                        آیا از تایید این سوال مطمئن هستید؟
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
                        <Button variant="contained" color="success">
                            تایید کن
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
