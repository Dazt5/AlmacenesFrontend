import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import { SaleDetail } from '../../components/Sales/SaleDetails';

function SaleDetails() {
    return (
        <>
            <NavBar />
            <h2 className="mb-5 page-name text-center">Ventas</h2>
            <div className='main-page'>
                <SaleDetail />
            </div>
        </>
    )
}

export default SaleDetails;