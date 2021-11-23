import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import { ProductForm } from '../../components/Products/ProductForm';

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