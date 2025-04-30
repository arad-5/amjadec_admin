'use client'
import React from 'react'
import { Button, Chip, IconButton, Tooltip } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import SubdirectoryArrowLeftTwoToneIcon from '@mui/icons-material/SubdirectoryArrowLeftTwoTone'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import QuestionDeleteModal from '../Modals/QuestionDeleteModal'
import QuestionConfirmModal from '../Modals/QuestionConfirmModal'
import QuestionAnswerModal from '../Modals/QuestionAnswerModal'

const QuestionCard = () => {
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
                    <span className="text-xs block mb-2">متن سوال:</span>
                    <p className="p-3 bg-[#fcfcfc] rounded-md">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Odit deserunt sapiente dolores
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <QuestionConfirmModal />
                    <QuestionDeleteModal />
                </div>
                <QuestionAnswerModal />
            </div>
        </div>
    )
}

export default QuestionCard
