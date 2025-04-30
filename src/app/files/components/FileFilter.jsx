import { Chip } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'

const FileFilter = () => {
    return (
        <div className="pr-4 pb-4 border-b flex items-center">
            <div className="shrink-0">
                <span>فیلتر ها:</span>
            </div>
            <div className="w-full flex mr-2 gap-2 overflow-x-auto rounded-full">
                <FilterChip label={'تایید نشده'} />
                <FilterChip label={'پرفروش ترین'} />
                <FilterChip label={'پربازدید ترین'} />
                <FilterChip label={'کم بازدید ترین'} />
                <FilterChip label={'تایید شده'} />
            </div>
        </div>
    )
}

export default FileFilter
const FilterChip = ({ label }) => {
    const [selected, setSelected] = useState(false)
    const handleClick = () => setSelected((curr) => !curr)

    return (
        <Chip
            className={
                'overflow-visible ' + selected
                    ? ''
                    : '!bg-[#fcfcfc] hover:!bg-[#dadada] !border-neutral-200'
            }
            variant={selected ? 'filled' : 'outlined'}
            color={selected ? 'secondary' : 'inherit'}
            icon={
                selected ? (
                    <CheckIcon fontSize="small" />
                ) : (
                    <AddIcon fontSize="small" className="!text-neutral-500" />
                )
            }
            label={label}
            onClick={handleClick}
        />
    )
}
