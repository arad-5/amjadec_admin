import { BottomBarContext } from '@/context/BottomBarContextProvider'
import { Button } from '@mui/material'
import React, { useContext } from 'react'

const BottomBar = () => {
    const { bottomBar } = useContext(BottomBarContext)

    if (!bottomBar) return null
    return (
        <div className="sticky bottom-0 left-0 w-full p-6 bg-white">
            {bottomBar}
        </div>
    )
}

export default BottomBar
