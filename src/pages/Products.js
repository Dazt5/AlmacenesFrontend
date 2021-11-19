import React from 'react';
import { NavBar } from '../Components/NavBar/NavBar';
import { ProductsList } from '../Components/Products/ProductsList';

function Products() {
    return (
        <>
            <NavBar />
            <div className='main-page'>
                <ProductsList />
            </div>
        </>
    )
}

export default Products;