import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
import * as BsIcons from 'react-icons/bs'
import { api, microservicesUri } from '../../../config/axiosConfig';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import Spinner from '../../common/Spinner/Spinner';
import { HttpRequestOnActionHandler } from '../../../config/httpHandlers';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

export const ProductsList = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getProductos = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(microservicesUri.products);
            setProducts(data);
            setLoading(false);
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        getProductos();
        //eslint-disable-next-line
    }, [])

    return (
        <div className="content">
            <div className="container">

                {loading && <Spinner />}

                {products.length <= 0 && !loading ?
                    <ErrorMessage
                        message={"No existen productos registrados"}
                    />
                    :

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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <Product
                                        key={product.codigo_producto}
                                        product={product}
                                        getProductos={getProductos}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                }


                <div className="action-buttons">
                    <Link to="/product/new">
                        <h3 className="btn btn-dark text-center"> Crear produto</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
}


const Product = ({ product, getProductos }) => {

    const navigate = useNavigate();

    const deleteProduct = async () => {

        Swal.fire({
            title: '¿Estas seguro?',
            text: "Esta operación no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo.'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await api.delete(`${microservicesUri.products}${product.codigo_producto}`)

                    Swal.fire(
                        'Eliminado!',
                        data.message,
                        'success'
                    );
                    getProductos();
                } catch (error) {
                    HttpRequestOnActionHandler(error, navigate)
                }
            }
        });
    }

    return (
        <tr>
            <td>{product.codigo_producto}</td>
            <td>{product.nombre_producto}</td>
            <td>{product.nitproveedor}</td>
            <td>{product.precio_compra}</td>
            <td>{product.ivacompra}</td>
            <td>{product.precio_venta}</td>
            <td>
                <div className="table-buttons">
                    <BsIcons.BsTrashFill className="trash-icon" onClick={deleteProduct} />
                    <Link to={`/product/edit/${product.codigo_producto}`}>
                        <BsIcons.BsPencilSquare className="pencil-icon" />
                    </Link>
                </div>
            </td>
        </tr>
    )
}
