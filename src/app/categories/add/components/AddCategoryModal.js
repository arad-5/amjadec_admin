import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import AddCategoryCheckList from './AddCategoryCheckList'

export default function AddCategoryModal() {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">
                افزودن زیر دسته
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-white max-w-96 w-full p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
                    <AddCategoryCheckList />
                    <div>
                        <Button variant="contained">تایید</Button>
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={handleClose}
                        >
                            لغو
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
