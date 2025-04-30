'use client'
import { Pagination, PaginationItem } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const PaginationBar = () => {
    return (
        <div className="w-full py-3 px-4 sticky bottom-0 left-0 flex justify-center bg-white">
            <Pagination
                color="primary"
                dir="ltr"
                count={5}
                size="large"
                renderItem={(item) => (
                    <PaginationItem
                        slots={{
                            previous: ArrowForwardIcon,
                            next: ArrowBackIcon,
                        }}
                        {...item}
                    />
                )}
            />
        </div>
    )
}

export default PaginationBar
