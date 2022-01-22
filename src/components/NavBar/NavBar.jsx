import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData.js'
import './NavBar.css';
import { IconContext } from 'react-icons'
import {useNavigate} from 'react-router-dom'
import { api, microservicesUri } from '../../config/axiosConfig.js'
import { HttpRequestOnActionHandler } from '../../config/httpHandlers.js'

export function NavBar() {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar);

    const [loading, setLoading] = useState(false);
    const [subsidiary, setSubsidiary] = useState({});

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

    const getSubsidiary = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`${microservicesUri.login}subsidiary`);
            setSubsidiary(data)
            return setLoading(false);
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate);
            setLoading(false);
        }

    }

    useEffect(() => {
        verifySession();
        return getSubsidiary();
    })

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>

                    <h4 className="text-light">Sucursal de <strong>{subsidiary.ciudad}</strong> </h4>

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
