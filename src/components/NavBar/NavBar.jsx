import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData.js'
import './NavBar.css';
import { IconContext } from 'react-icons'

import {useNavigate} from 'react-router-dom'

export function NavBar() {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar);

    let navigate = useNavigate();

    const closeSession = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    const verifySession = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/")
        }
    }

    useEffect(() => {
        
        verifySession();

    })

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>

                    <h2 className="btn btn-dark" onClick={closeSession}>Cerrar sesión</h2>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {
                            SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span className="text-icon-separator">{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}
