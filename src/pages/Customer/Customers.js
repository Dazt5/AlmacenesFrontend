import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import { CustomerList } from '../../components/Customers/CustomersList';

function Customers() {
    return (
        <>
            <NavBar />
            <h2 className="mb-5 page-name text-center">Clientes</h2>
            <div className='main-page'>
                <CustomerList />
            </div>
        </>
    )
}

export default Customers;