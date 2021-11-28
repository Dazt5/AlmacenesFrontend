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

//Customer Pages
import Customers from '../pages/Customer/Customers';
import CustomerForm from '../pages/Customer/CustomerForm';

//Provider Pages
import Providers from '../pages/Providers/Providers';
import ProviderForm from '../pages/Providers/ProviderForm';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Login />} />

                <Route exat path="/products" element={<Products />} />
                <Route exact path="/product/new" element={<ProductForm />} />
                <Route exact path="/product/edit/:id" element={<ProductForm />} />
                <Route exact path="/product/file" element={<ProductForm />} />

                <Route exact path="/customers" element={<Customers />} />
                <Route exact path="/customer/new" element={<CustomerForm />} />
                <Route exact path="/customer/edit/:id" element={<CustomerForm />} />
                
                <Route exact path="/providers" element={<Providers />} />
                <Route exact path="/provider/new" element={<ProviderForm />} />
                <Route exact path="/provider/edit/:id" element={<ProviderForm />} />

            </Routes>
        </Router>
    )
}

export default App;