'use client'

import React, { useContext, useState } from 'react'

import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

const SideMenu = () => {
    return (
        <div className="w-[230px] border-l hidden lg:flex shrink-0 py-4 rounded-none sticky top-0 h-screen lg:flex-col justify-between bg-white">
            <NavigationList />
            <div className="px-6">
                <Logout />
            </div>
        </div>
    )
}

export default SideMenu
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import TableViewTwoToneIcon from '@mui/icons-material/TableViewTwoTone'
import RuleIcon from '@mui/icons-material/Rule'
import QuizTwoToneIcon from '@mui/icons-material/QuizTwoTone'
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone'
import PermMediaTwoToneIcon from '@mui/icons-material/PermMediaTwoTone'
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyTwoTone'
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone'
import AddIcon from '@mui/icons-material/Add'
import Admin from './Admin'
import Logo from '../Logo'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/utils/cn'
import {
    Box,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Tooltip,
} from '@mui/material'

import { FileUploadDialogContext } from '@/context/FileUploadDialogContextProvider'
import { AuthContext } from '@/context/AuthContext'
import Logout from './Logout'

const NavigationList = () => {
    const { admin } = useContext(AuthContext)
    const { open: openUploadDialog, setOpen: setOpenUploadDialog } = useContext(
        FileUploadDialogContext
    )
    const router = useRouter()
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
        ...(admin?.role === 'owner'
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
        ,
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
                // {
                //     title: 'ناقص ها',
                //     href: '/products/incompletes',
                //     icon: (
                //         <RuleIcon
                //             className="!text-inherit ml-3"
                //             fontSize="small"
                //         />
                //     ),
                //     active: true,
                // },
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
                    href: '',
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
            title: 'کاربران',
            href: '/users',
            icon: (
                <PeopleAltTwoToneIcon
                    className="!text-inherit"
                    fontSize="small"
                />
            ),
            active: false,
        },
        {
            title: 'سفارشات',
            href: '/users',
            icon: (
                <ShoppingCartTwoToneIcon
                    className="!text-inherit"
                    fontSize="small"
                />
            ),
            active: false,
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
    ]
    const pathname = usePathname()
    return (
        <div>
            <div className="px-6  pb-3 border-b">
                <div className="flex items-center border-b mb-3">
                    <div>
                        <span className="text-[10px] -mb-3 block">
                            شهر الکترونیک
                        </span>
                        <Logo className="w-[64px] h-[64px]" />
                    </div>
                    <div className="px-3 border-r mr-3">
                        <span className="text-sm">پنل ادمین</span>
                    </div>
                </div>
                <Admin />
            </div>
            <MenuList>
                <MenuItem className="!py-0"></MenuItem>
                {navigations.map((items, i) =>
                    items?.subItems?.length ? (
                        <CollapseItem key={i} item={items} />
                    ) : (
                        <MenuItem
                            className={cn(
                                '!py-3',
                                ((!(items.href === '/') &&
                                    pathname.includes(items.href)) ||
                                    (items.href === '/' && pathname === '/')) &&
                                    '!bg-blue-100 !text-blue-900 !font-bold'
                            )}
                            key={i}
                            onClick={() =>
                                items?.onClick
                                    ? items?.onClick
                                    : router.push(items.href)
                            }
                            disabled={!items?.active}
                        >
                            {items.active ? (
                                <>
                                    <ListItemIcon className="!text-inherit">
                                        {items.icon}
                                    </ListItemIcon>
                                    <ListItemText>{items.title}</ListItemText>
                                </>
                            ) : (
                                <Tooltip
                                    className=" cursor-not-allowed flex items-center"
                                    title="این صفحه فعلا در دسترس نیست"
                                    placement="left"
                                >
                                    <ListItemIcon className="!text-inherit">
                                        {items.icon}
                                    </ListItemIcon>
                                    <ListItemText>{items.title}</ListItemText>
                                </Tooltip>
                            )}
                        </MenuItem>
                    )
                )}
            </MenuList>
        </div>
    )
}
const CollapseItem = ({ item }) => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const router = useRouter()
    return (
        <>
            <ListItem
                className={cn(
                    '!py-0',
                    ((!(item.href === '/') && pathname.includes(item.href)) ||
                        (item.href === '/' && pathname === '/')) &&
                        '!bg-blue-100 !text-blue-900 !font-bold'
                )}
                sx={{
                    padding: 0,
                    display: 'flex',
                }}
            >
                <MenuItem
                    sx={{
                        width: '100%',
                        paddingY: '0',
                    }}
                    component="div"
                    onClick={() =>
                        item?.onClick ? item?.onClick : router.push(item.href)
                    }
                    className="!py-3"
                >
                    <ListItemIcon className="!text-inherit">
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText>{item.title}</ListItemText>
                </MenuItem>
                <Box
                    sx={{
                        display: 'block',
                        height: '100%',
                        marginRight: 1,
                    }}
                    className="!h-full self-stretch"
                >
                    <IconButton onClick={() => setOpen((curr) => !curr)}>
                        <KeyboardArrowDownIcon
                            sx={{
                                transform: open ? 'rotate(180deg)' : '',
                                transition: 'all 200ms',
                            }}
                            fontSize="medium"
                        />
                    </IconButton>
                </Box>
            </ListItem>
            <Collapse
                className="border-b pr-3"
                in={open}
                timeout="auto"
                unmountOnExit
            >
                <List
                    component="div"
                    disablePadding
                    sx={{
                        borderLeft: '2px solid orange',
                    }}
                >
                    {item.subItems.map((item, i) => (
                        <ListItemButton
                            key={item.title + i}
                            className={cn(
                                ((!(item.href === '/') &&
                                    pathname.includes(item.href)) ||
                                    (item.href === '/' && pathname === '/')) &&
                                    '!bg-neutral-50 !text-neutral-900 !font-bold'
                            )}
                            onClick={() =>
                                item?.onClick
                                    ? item?.onClick()
                                    : router.push(item.href)
                            }
                        >
                            {item.icon}
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    )
}
