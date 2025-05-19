import Messages from './Messages/Messages'

const TopBar = ({ title, icon }) => {
    return (
        <>
            <div className="sticky w-full top-0 left-0 z-30">
                <div className="flex items-center justify-between h-20 px-6 !bg-[#1462b0] text-white">
                    <div className="flex items-center ">
                        {icon}
                        <h1 className="text-xl font-bold">{title}</h1>
                    </div>
                </div>
                <Messages />
            </div>
        </>
    )
}

export default TopBar
