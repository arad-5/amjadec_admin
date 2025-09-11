'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { SlMenu } from 'react-icons/sl'
import Admin from './Admin'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <div className="sticky top-0 left-0 w-full px-6 h-14 border-b bg-white lg:hidden z-40">
                <div className="container flex justify-between items-center h-full mx-auto">
                    <button
                        className=""
                        onClick={() => setIsMenuOpen((curr) => !curr)}
                    >
                        <SlMenu className="text-2xl" />
                    </button>
                    <Admin />
                </div>
            </div>
            {isMenuOpen ? <SideMenu setIsMenuOpen={setIsMenuOpen} /> : null}
        </>
    )
}
const SideMenu = ({ setIsMenuOpen }) => {
    return (
        <div className="h-screen overflow-y-auto fixed top-0 right-0 w-64 bg-white border-l pb-6 z-40 flex flex-col">
            <div className="px-6 pt-6 bg-white sticky top-0 left-0 w-full z-10">
                <button onClick={() => setIsMenuOpen(false)}>
                    <RxCross2 className="text-2xl" />
                </button>
            </div>
            <NestedList />
            <Logout />
        </div>
    )
}

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone'
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone'
import AddIcon from '@mui/icons-material/Add'
import TableViewTwoToneIcon from '@mui/icons-material/TableViewTwoTone'
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyTwoTone'
import PermMediaTwoToneIcon from '@mui/icons-material/PermMediaTwoTone'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone'
import QuizTwoToneIcon from '@mui/icons-material/QuizTwoTone'
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone'
import DataObjectIcon from '@mui/icons-material/DataObject'
import PermPhoneMsgTwoToneIcon from '@mui/icons-material/PermPhoneMsgTwoTone'
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone'
import { AuthContext } from '@/context/AuthContext'
import { ListItem } from '@mui/material'
import Logout from './Logout'
import { FileUploadDialogContext } from '@/context/FileUploadDialogContextProvider'

function NestedList() {
    const { admin } = useContext(AuthContext)

    const navigations = [
        {
            title: 'داشبورد',
            href: '/',
            icon: (
                <DashboardTwoToneIcon
                    className="!text-inherit"
                    fontSize="small"
                />
            ),
            active: true,
        },
        ...(admin?.role === 'owner' || admin?.role === 'developer'
            ? [
                  {
                      title: 'مدیریت ادمین',
                      href: '/admins',
                      icon: (
                          <PeopleAltTwoToneIcon
                              className="!text-inherit"
                              fontSize="small"
                          />
                      ),
                      active: true,
                  },
              ]
            : []),
        {
            title: 'دسته بندی ها',
            href: '/categories',
            icon: (
                <CategoryTwoToneIcon
                    className="!text-inherit"
                    fontSize="small"
                />
            ),
            active: true,
        },
        {
            title: 'محصولات',
            href: '/products',
            icon: (
                <GridViewTwoToneIcon
                    className="!text-inherit"
                    fontSize="small"
                />
            ),
            subItems: [
                {
                    title: 'افزودن',
                    href: '/products/add',
                    icon: (
                        <AddIcon
                            className="!text-inherit ml-3"
                            fontSize="small"
                        />
                    ),
                    active: true,
                },
            ],
            active: true,
        },
        {
            title: 'اکسل',
            href: '/excel',
            icon: (
                <TableViewTwoToneIcon
                    className="!text-inherit"
                    fontSize="small"
                />
            ),
            active: true,
        },
        {
            title: 'فایل ها',
            href: '/files',
            icon: (
                <FileCopyTwoToneIcon
                    className="!text-inherit"
                    fontSize="small"
                />
            ),
            subItems: [
                {
                    title: 'آپلود',
                    href: null,
                    onClick: () => setOpenUploadDialog(true),
                    icon: (
                        <AddIcon
                            className="!text-inherit ml-3"
                            fontSize="small"
                        />
                    ),
                },
                {
                    title: 'تصویر ها',
                    href: '/files/images',
                    icon: (
                        <PermMediaTwoToneIcon
                            className="!text-inherit ml-3"
                            fontSize="small"
                        />
                    ),
                },
            ],
            active: true,
        },
        {
            title: 'سفارشات',
            href: '/orders',
            icon: (
                <ShoppingCartTwoToneIcon
                    className="!text-inherit"
                    fontSize="small"
                />
            ),
            active: true,
        },
        {
            title: 'سوالات',
            href: '/questions',
            icon: (
                <QuizTwoToneIcon className="!text-inherit" fontSize="small" />
            ),
            active: false,
        },
        {
            title: 'دیدگاه ها',
            href: '/comments',
            icon: (
                <QuestionAnswerTwoToneIcon
                    className="!text-inherit"
                    fontSize="small"
                />
            ),
            active: false,
        },
        {
            title: 'پشتیبانی',
            href: '/support',
            icon: (
                <PermPhoneMsgTwoToneIcon
                    className="!text-inherit"
                    fontSize="small"
                />
            ),
            active: true,
        },
        {
            title: 'نسخه ها',
            href: '/versions',
            icon: <DataObjectIcon className="!text-inherit" fontSize="small" />,
            active: true,
        },
        {
            title: 'آموزش',
            href: '/document',
            icon: (
                <SchoolTwoToneIcon className="!text-inherit" fontSize="small" />
            ),
            active: true,
        },
    ]
    return (
        <List
            sx={{ width: '100%', height: '100%' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {navigations.map((item) =>
                item.subItems ? (
                    <CollapseItem item={item} key={item.title} />
                ) : (
                    <ListItemButton
                        key={item.title}
                        href={item.href}
                        disabled={!item.active}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItemButton>
                )
            )}
        </List>
    )
}
const CollapseItem = ({ item }) => {
    const [open, setOpen] = React.useState(false)

    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <>
            <ListItem sx={{ p: 0, m: 0 }}>
                <List sx={{ p: 0, m: 0, display: 'flex', width: '100%' }}>
                    <ListItemButton
                        sx={{ width: '100%' }}
                        href={item.href}
                        disabled={!item.active}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItemButton>
                    <ListItemButton
                        onClick={handleClick}
                        disabled={!item.active}
                    >
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </List>
            </ListItem>

            <Collapse
                in={open}
                className="border-b"
                timeout="auto"
                unmountOnExit
            >
                <List className="mr-3" component="div" disablePadding>
                    {item.subItems.map((item) =>
                        item?.onClick ? null : (
                            <ListItemButton key={item.title} href={item.href}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        )
                    )}
                </List>
            </Collapse>
        </>
    )
}
export default Navbar
