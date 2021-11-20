import React, { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom'
import './Products.css'
import { ProductsData } from './ProductsData'

export const ProductsList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        setProducts(ProductsData)
        console.log(products)
    }, [products])

    return (
        <div className="content">
            <div className="container">
                <h2 className="mb-5 page-name text-center">Productos</h2>

                <div className="table-responsive custom-table-responsive">

                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Proveedor</th>
                                <th>Precio de Compra</th>
                                <th>Iva</th>
                                <th>Precio de Venta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <Product
                                    product={product}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


const Product = ({ product }) => {
    return (<tr>
        <td>{product.codigo_producto}</td>
        <td>{product.nombre_producto}</td>
        <td>{product.nitproveedor}</td>
        <td>{product.precio_compra}</td>
        <td>{product.ivacompra}</td>
        <td>{product.precio_venta}</td>
    </tr>
    )
}
