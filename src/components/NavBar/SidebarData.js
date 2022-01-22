import React from 'react'

import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import * as IoIcons from 'react-icons/io'

export const SidebarData = [
    {
        title: 'Products',
        path: '/products',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Clientes',
        path: '/customers',
        icon: <IoIcons.IoIosPerson />,
        cName: 'nav-text'
    },
    {
        title: 'Proveedores',
        path: '/providers',
        icon: <MdIcons.MdCorporateFare />,
        cName: 'nav-text'
    },
    {
        title: 'Ventas',
        path: '/sales',
        icon: <MdIcons.MdCardMembership />,
        cName: 'nav-text'
    },
    {
        title: 'Consolidado',
        path: '/consolidate',
        icon: <MdIcons.MdList />,
        cName: 'nav-text'
    },
]