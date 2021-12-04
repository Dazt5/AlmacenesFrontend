import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import { SalesList } from '../../components/Sales/SalesList';

function Providers() {
    return (
        <>
            <NavBar />
            <h2 className="mb-5 page-name text-center">Ventas</h2>
            <div className='main-page'>
                <SalesList />
            </div>
        </>
    )
}

export default Providers;