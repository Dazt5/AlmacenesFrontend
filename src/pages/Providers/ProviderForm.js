import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import { ProviderForm } from '../../components/Providers/ProviderForm';

function Providers() {
    return (
        <>
            <NavBar />
            <h2 className="mb-5 page-name text-center">Proveedores</h2>
            <div className='main-page'>
                <ProviderForm />
            </div>
        </>
    )
}

export default Providers;