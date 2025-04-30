'use client'
import { Button, Chip, IconButton, Rating, Tooltip } from '@mui/material'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import CommentDeleteModal from '../Modals/CommentDeleteModal'
import CommentConfirmModal from '../Modals/CommentConfirmModal'
import CommentAnswerModal from '../Modals/CommentAnswerModal'

const CommentCard = () => {
    return (
        <div className="p-4 rounded-xl shadow">
            <div className="flex mb-2  font-semibold  justify-between items-center">
                <span>آراد تقی خانی</span>
                <Tooltip title="جزییات کامل">
                    <IconButton>
                        <ChevronLeftIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="mb-4 flex">
                <Chip
                    label="جدید"
                    color="error"
                    size="small"
                    className="ml-2 font-semibold"
                />
                <Chip
                    label="تایید نشده"
                    variant="outlined"
                    size="small"
                    className="ml-2"
                />
                <Chip label="بی پاسخ" variant="outlined" size="small" />
            </div>

            <div className="pb-2">
                <div className="mb-3">
                    <span className="text-xs block mb-2">محصول:</span>
                    <div className="flex">
                        <div className="h-16 w-16 bg-[#fcfcfc] rounded-md"></div>
                        <div className="mr-3">
                            <span className="text-sm">شکسمینبت</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="text-xs block mb-2">امتیاز دیدگاه:</span>
                    <Rating name="امتیاز" value={4} readOnly size="small" />
                </div>
                <div>
                    <span className="text-xs block mb-2">متن دیدگاه:</span>
                    <p className="p-3 bg-[#fcfcfc] rounded-md">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Odit deserunt sapiente dolores
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <CommentConfirmModal />
                    <CommentDeleteModal />
                </div>
                <CommentAnswerModal />
            </div>
        </div>
    )
}

export default CommentCard
