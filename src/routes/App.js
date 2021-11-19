import React from 'react';
import Login from '../pages/Login';

import {
    BrowserRouter as Router,
    Routes, Route
} from 'react-router-dom';

import './App.css';

import Products from '../pages/Products';

const App = () => {
    return (
        <Router>
            
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </Router>
    )
}

export default App;