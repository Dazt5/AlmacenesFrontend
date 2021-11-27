import React from 'react'
import { Link } from 'react-router-dom'


export const BottomTableButton = ({text,route}) => {


    return (
        <Link to={route}>
            <h3 className="btn btn-dark text-center">{text}</h3>
        </Link>
    )

}