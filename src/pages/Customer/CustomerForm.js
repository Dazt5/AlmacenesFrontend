import React from 'react';
import { CustomerForm } from '../../components/Customers/CustomerForm';
import { NavBar } from '../../components/NavBar/NavBar';

function Customer() {
    return (
        <>
            <NavBar />
            <h2 className="mb-5 page-name text-center">Clientes</h2>
            <div className='main-page'>
                <CustomerForm />
            </div>
        </>
    )
}

export default Customer;