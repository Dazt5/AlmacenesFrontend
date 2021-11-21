import React from 'react';
import { NavBar } from '../../Components/NavBar/NavBar';
import { ProductForm } from '../../Components/Products/ProductForm';

function Products() {
    return (
        <>
            <NavBar />
            <h2 className="mb-5 page-name text-center">Productos</h2>
            <div className='main-page'>
                <ProductForm />
            </div>
        </>
    )
}

export default Products;