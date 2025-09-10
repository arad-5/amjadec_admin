'use client'

import React, { useContext, useState } from 'react'
import {
    MenuList,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    Box,
    List,
    ListItem,
    ListItemButton,
    IconButton,
    Tooltip,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/utils/cn'
import { AuthContext } from '@/context/AuthContext'
import { FileUploadDialogContext } from '@/context/FileUploadDialogContextProvider'

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

const NavigationList = () => {
    const { admin } = useContext(AuthContext)
    const { setOpen: setOpenUploadDialog } = useContext(FileUploadDialogContext)
    const router = useRouter()
    const pathname = usePathname()

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
        <MenuList>
            {navigations.map((item, i) =>
                item?.subItems?.length ? (
                    <CollapseItem key={i} item={item} />
                ) : (
                    <MenuItem
                        key={i}
                        className={cn(
                            '!py-3',
                            ((!(item.href === '/') &&
                                pathname.includes(item.href)) ||
                                (item.href === '/' && pathname === '/')) &&
                                '!bg-blue-100 !text-blue-900 !font-bold'
                        )}
                        onClick={() =>
                            item?.onClick
                                ? item?.onClick()
                                : router.push(item.href)
                        }
                        disabled={!item?.active}
                    >
                        {item.active ? (
                            <>
                                <ListItemIcon className="!text-inherit">
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>{item.title}</ListItemText>
                            </>
                        ) : (
                            <Tooltip
                                className="cursor-not-allowed flex items-center"
                                title="این صفحه فعلا در دسترس نیست"
                                placement="left"
                            >
                                <ListItemIcon className="!text-inherit">
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>{item.title}</ListItemText>
                            </Tooltip>
                        )}
                    </MenuItem>
                )
            )}
        </MenuList>
    )
}

export default NavigationList

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
                sx={{ padding: 0, display: 'flex' }}
            >
                <MenuItem
                    sx={{ width: '100%', paddingY: '0' }}
                    component="div"
                    onClick={() =>
                        item?.onClick ? item?.onClick() : router.push(item.href)
                    }
                    className="!py-3"
                >
                    <ListItemIcon className="!text-inherit">
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText>{item.title}</ListItemText>
                </MenuItem>
                <Box
                    sx={{ display: 'block', height: '100%', marginRight: 1 }}
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
                in={open}
                timeout="auto"
                unmountOnExit
                className="border-b pr-3"
            >
                <List
                    component="div"
                    disablePadding
                    sx={{ borderLeft: '2px solid orange' }}
                >
                    {item.subItems.map((sub, i) => (
                        <ListItemButton
                            key={sub.title + i}
                            className={cn(
                                ((!(sub.href === '/') &&
                                    pathname.includes(sub.href)) ||
                                    (sub.href === '/' && pathname === '/')) &&
                                    '!bg-neutral-50 !text-neutral-900 !font-bold'
                            )}
                            onClick={() =>
                                sub?.onClick
                                    ? sub?.onClick()
                                    : router.push(sub.href)
                            }
                        >
                            {sub.icon}
                            <ListItemText primary={sub.title} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    )
}
