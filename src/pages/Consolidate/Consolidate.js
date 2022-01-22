import React from 'react';
import { Consolidate } from '../../components/Consolidate';
import { NavBar } from '../../components/NavBar/NavBar';

function Consolidates() {
    return (
        <>
            <NavBar />
            <h2 className="mb-5 page-name text-center">Consolidado</h2>
            <div className='main-page'>
                <Consolidate />
            </div>
        </>
    )
}

export default Consolidates;