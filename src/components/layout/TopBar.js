import Messages from './Messages/Messages'

const TopBar = ({ title, icon }) => {
    return (
        <>
            <div className="lg:sticky fixed w-full top-14 lg:top-0 left-0 z-30">
                <div className="flex items-center justify-between lg:h-20 h-14 px-6 !bg-[#1462b0] text-white">
                    <div className="flex items-center ">
                        {icon}
                        <h1 className="lg:text-xl font-bold">{title}</h1>
                    </div>
                </div>
                <Messages />
            </div>
            <div className="h-14 lg:hidden"></div>
        </>
    )
}

export default TopBar
