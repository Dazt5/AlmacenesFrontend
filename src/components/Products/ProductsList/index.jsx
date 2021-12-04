import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
import * as BsIcons from 'react-icons/bs';
import { api, microservicesUri } from '../../../config/axiosConfig';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import Spinner from '../../common/Spinner/Spinner';
import { HttpRequestOnActionHandler } from '../../../config/httpHandlers';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { BottomTableButton } from '../../common/Buttons/BottomTableButton';

export const ProductsList = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productId, setProductId] = useState('');

    const navigate = useNavigate();

    const getProducts = async () => {
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
        getProducts();
        //eslint-disable-next-line
    }, [])

    const getProduct = async () => {
        if (productId.trim() === '') {
            return Swal.fire({
                title: "Código inválido",
                text: "El campo está vacio o contiene caracteres inválidos",
                icon:"error"
            })
        }

        try {
            setLoading(true);
            const { data } = await api.get(`${microservicesUri.products}${productId}`);

            if (data) {
                setProducts([data]);
            } else {
                setProducts([]);
            }
            setLoading(false);
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate)
        } finally {
            setLoading(false)
        }
    }

    const readCode = e => {
        setProductId(e.target.value);
    }

    const showAll = () => {
        setProductId('')
        getProducts()
    }

    return (
        <div className="content">
            <div className="container">

                <div className="row mb-2 text-center ">
                    <h5 className="text-white">Buscar producto por código</h5>
                    <div className="col-2 d-block mx-auto">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Codigo"
                            disabled={loading}
                            onChange={readCode}
                            value={productId}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <h5 className="m-1 btn col-1 d-block btn-dark text-center"
                            onClick={getProduct}
                        >Buscar</h5>
                        <h5 className="m-1 btn col-1 d-block btn-dark text-center"
                            onClick={showAll}
                        >Ver todos</h5>
                    </div>
                </div>

                {loading && <Spinner />}

                {products.length <= 0 && !loading ?
                    <ErrorMessage
                        message={"No se pudo encontrar el/los producto"}
                    />
                    :
                    !loading &&
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
                                        getProducts={getProducts}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                }

                <div className="action-buttons">
                    <BottomTableButton
                        text="Crear producto"
                        route="/product/new"
                    />
                </div>
            </div>
        </div>
    );
}


const Product = ({ product, getProducts }) => {

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
                    getProducts();
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
