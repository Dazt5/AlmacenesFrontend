import React from 'react';
import { NavBar } from '../../Components/NavBar/NavBar';
import { ProductsList } from '../../Components/Products/ProductsList';

function Products() {
    return (
        <>
            <NavBar />
            <h2 className="mb-5 page-name text-center">Productos</h2>
            <div className='main-page'>
                <ProductsList />
            </div>
        </>
    )
}

export default Products;