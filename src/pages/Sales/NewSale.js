import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import { MakeSale } from '../../components/Sales/MakeSaleForm';

function NewSale() {
    return (
        <>
            <NavBar />
            <h2 className="mb-5 page-name text-center">Ventas</h2>
            <div className='main-page'>
                <MakeSale />
            </div>
        </>
    )
}

export default NewSale;