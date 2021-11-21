import React from 'react';


import {
    BrowserRouter as Router,
    Routes, Route
} from 'react-router-dom';

import './App.css';

//Auth Pages
import Login from '../pages/Login/Login';

//Product Pages
import Products from '../pages/Product/Products';
import ProductForm from '../pages/Product/ProductForm';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route exat path="/products" element={<Products />} />
                <Route exact path="/product/new" element={<ProductForm />} />
                <Route exact path="/product/edit/:id" element={<ProductForm />} />
                <Route exact path="/product/file" element={<ProductForm />} />
            </Routes>
        </Router>
    )
}

export default App;