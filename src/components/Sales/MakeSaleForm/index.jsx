import React, { useState, useEffect } from 'react';
import * as MdIcons from 'react-icons/md'
import { api, microservicesUri } from '../../../config/axiosConfig';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import Spinner from '../../common/Spinner/Spinner';
import { HttpRequestOnActionHandler } from '../../../config/httpHandlers';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import './MakeSaleForm.css'

export const MakeSale = () => {

    const navigate = useNavigate();

    const [saleLoading, setSaleLoading] = useState(false);

    const [cart, setCart] = useState({
        "cedulaCliente": "",
        "total": 0,
        "totalIva": 0,
        "subTotal": 0,
        "productos": []
    });
    const [identification, setIdentification] = useState('');

    const addCarrito = (product, quantity) => {

        if (Number(quantity) <= 0) {
            return Swal.fire(
                "Error al agregar al carrito",
                "Debe ingresar un número mayor a cero",
                "warning"
            )
        }
        if (isDuplicate(product, quantity)) {
            updateInCart(product, quantity);
        } else {
            addProduct(product, quantity);
        }
    }

    const updateInCart = (product, quantity) => {
        const lastCart = { ...cart };

        lastCart.productos.forEach(p => {
            if (p.codigo_producto === product.codigo_producto) {
                p.cantidadProductos += Number(quantity);
                p.valorVenta = product.precio_venta * p.cantidadProductos;
                p.valorIva = p.valorVenta * (product.ivacompra / 100);
                p.valorTotal = Number(p.valorVenta) + Number(p.valorIva);
            }
        });
        let subTotal = 0, totalIva = 0, total = 0;
        lastCart.productos.forEach(p => {
            total += p.valorTotal;
            totalIva += p.valorIva;
            subTotal += p.valorVenta;
        });
        lastCart.subTotal = subTotal;
        lastCart.totalIva = totalIva;
        lastCart.total = total;
        setCart(lastCart);
    }

    const addProduct = (product, quantity) => {
        const { codigo_producto, ivacompra, precio_venta } = product;

        const lastCart = { ...cart };
        const valorVenta = precio_venta * Number(quantity);
        const valorIva = valorVenta * (ivacompra / 100);
        const valorTotal = valorVenta + valorIva;

        const newProduct = {
            codigo_producto,
            "nombreProducto": product.nombre_producto,
            "valorVenta": valorVenta,
            "valorIva": valorIva,
            "valorTotal": valorTotal,
            "cantidadProductos": Number(quantity)
        };

        lastCart.productos.push(newProduct);
        lastCart.subTotal += valorVenta;
        lastCart.totalIva += valorIva;
        lastCart.total += valorTotal;
        setCart(lastCart);
    }

    const removeProduct = product => {
        let lastCart = { ...cart };
        const productRemoved = lastCart.productos.filter(p => p.codigo_producto === product.codigo_producto);
        const { valorIva, valorTotal, valorVenta } = productRemoved[0];

        lastCart.subTotal -= valorVenta;
        lastCart.totalIva -= valorIva;
        lastCart.total -= valorTotal;

        const lastProducts = lastCart.productos.filter(p => p.codigo_producto !== product.codigo_producto);
        lastCart.productos = lastProducts;
        setCart(lastCart);
    }

    const isDuplicate = product => {
        return cart.productos.some(p => p.codigo_producto && product.codigo_producto === p.codigo_producto);
    }

    const readClientIdentification = e => {
        setIdentification(e.target.value);
    }

    const confirmSale = async (e) => {
        e.preventDefault();
        if (identification.trim().length <= 0) {
            return Swal.fire({
                title: "Cédula invalida",
                text: "El campo está vacio o contiene caracteres inválidos",
                icon: "error"
            })
        }
        const sale = { ...cart };
        sale.cedulaCliente = identification;

        //TODO: SEND TO API
        setSaleLoading(true);
        try {
            setTimeout(() => {
                setSaleLoading(false)
                Swal.fire({
                    title: "Venta realizada",
                    text: "La venta ha sido realizada satisfactoriamente",
                    icon: "success"
                })
                navigate("/sales")
            }, 2000);
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate)
            setSaleLoading(false)
        }
    }

    return (
        <>
            {cart.productos.length > 0 &&
                <Cart
                    loading={saleLoading}
                    cart={cart}
                    removeProduct={removeProduct}
                    readClientIdentification={readClientIdentification}
                    confirmSale={confirmSale}
                />
            }

            <ProductList
                saleLoading={saleLoading}
                addCarrito={addCarrito}
            />
        </>
    )
}

const Cart = ({ loading, cart, removeProduct, readClientIdentification, confirmSale }) => {

    return (
        <div className="container mb-5">
            <h2 className="text-center">Carrito de compras</h2>
            <div className="table-responsive custom-table-responsive">
                <table className="table custom-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Iva</th>
                            <th>SubTotal</th>
                            <th>Total</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.productos.map(product => (
                            <ProductCart
                                loading={loading}
                                key={product.codigo_producto}
                                product={product}
                                removeProduct={removeProduct}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-center">
                <p className="h4">SubTotal: {cart.subTotal}</p>
                <p className="h4">Total Iva: {cart.totalIva}</p>
                <p className="h4">Total: {cart.total}</p>
            </div>

            <div className="row mb-2 text-center ">
                <h5 className="text-white">Cedula del cliente</h5>
                <div className="col-2 d-block mx-auto">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Cedula"
                        onChange={readClientIdentification}
                        disabled={loading}
                    />
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <input
                    type="submit"
                    className="m-1 btn btn-dark"
                    value="Confirmar compra"
                    onClick={confirmSale}
                    disabled={loading}
                />
            </div>
        </div>
    )
}

const ProductCart = ({ loading, product, removeProduct }) => {

    return (
        <tr>
            <td>{product.codigo_producto}</td>
            <td>{product.nombreProducto}</td>
            <td>{product.cantidadProductos}</td>
            <td>{product.valorVenta}</td>
            <td>{product.valorIva}</td>
            <td>{product.valorTotal}</td>
            <td>
                <div className="table-buttons d-flex justify-content-around flex-row align-items-center">
                    {!loading ? <MdIcons.MdRemoveCircle
                        className="trash-icon mb-3"
                        onClick={() => removeProduct(product)}
                    />
                        :
                        <Spinner />
                    }

                </div>
            </td>
        </tr>
    )
}

const ProductList = ({ saleLoading, addCarrito }) => {
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
            setLoading(false)
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
                icon: "error"
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
            setLoading(false)
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
            <div className="container ">

                <div className="row mb-2 text-center mt-5">
                    <h5 className="text-white">Buscar producto por código</h5>
                    <div className="col-2 d-block mx-auto">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Codigo"
                            disabled={loading || saleLoading ? true : false}
                            onChange={readCode}
                            value={productId}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <input
                            className="m-1 btn btn-dark text-center"
                            type="submit"
                            onClick={getProduct}
                            disabled={loading || saleLoading ? true : false}
                            value="Buscar"
                        />
                        <input
                            className="m-1 btn btn-dark text-center"
                            type="submit"
                            onClick={showAll}
                            disabled={loading || saleLoading ? true : false}
                            value="Ver todos"
                        />
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
                                    <th>Precio</th>
                                    <th>Iva</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <Product
                                        saleLoading={saleLoading}
                                        key={product.codigo_producto}
                                        product={product}
                                        getProducts={getProducts}
                                        addCarrito={addCarrito}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
}

const Product = ({ saleLoading, product, addCarrito }) => {

    const [quantity, setQuantity] = useState(0);

    const readQuantity = (e) => {
        setQuantity(e.target.value);
    }

    return (
        <tr>
            <td>{product.codigo_producto}</td>
            <td>{product.nombre_producto}</td>
            <td>{product.precio_venta}</td>
            <td>{product.ivacompra}%</td>
            <td>
                <div className="table-buttons d-flex justify-content-around flex-row align-items-center">
                    <input
                        type="number"
                        className="input-group quantity-input"
                        name="cantidad"
                        onChange={readQuantity}
                        disabled={saleLoading}
                    />
                    {!saleLoading ?
                        <MdIcons.MdPlaylistAdd
                            className="add-icon mb-3"
                            onClick={() => addCarrito(product, quantity)}
                        />
                        :
                        <Spinner />
                    }

                </div>
            </td>
        </tr>
    )
}