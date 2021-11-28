import React from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import { ProviderList } from '../../components/Providers/ProviderList';

function Providers() {
    return (
        <>
            <NavBar />
            <h2 className="mb-5 page-name text-center">Proveedores</h2>
            <div className='main-page'>
                <ProviderList />
            </div>
        </>
    )
}

export default Providers;