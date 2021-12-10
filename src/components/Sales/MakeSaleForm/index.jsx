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
        "cedula_cliente": "",
        "total_venta": 0,
        "ivaventa": 0,
        "valor_venta": 0,
        "detalleVenta": []
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

        lastCart.detalleVenta.forEach(p => {
            if (p.codigo_producto === product.codigo_producto) {
                p.cantidad_producto += Number(quantity);
                p.valor_venta = product.precio_venta * p.cantidad_producto;
                p.valoriva = p.valor_venta * (product.ivacompra / 100);
                p.valor_total = Number(p.valor_venta) + Number(p.valoriva);
            }
        });
        let subTotal = 0, totalIva = 0, total = 0;
        lastCart.detalleVenta.forEach(p => {
            total += p.valor_total;
            totalIva += p.valoriva;
            subTotal += p.valor_venta;
        });
        lastCart.valor_venta = subTotal;
        lastCart.ivaventa = totalIva;
        lastCart.total_venta = total;
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
            "nombre_producto": product.nombre_producto,
            "valor_venta": valorVenta,
            "valoriva": valorIva,
            "valor_total": valorTotal,
            "cantidad_producto": Number(quantity)
        };

        lastCart.detalleVenta.push(newProduct);
        lastCart.valor_venta += valorVenta;
        lastCart.ivaventa += valorIva;
        lastCart.total_venta += valorTotal;
        setCart(lastCart);
    }

    const removeProduct = product => {
        let lastCart = { ...cart };
        const productRemoved = lastCart.detalleVenta.filter(p => p.codigo_producto === product.codigo_producto);

        const { valoriva, valor_total, valor_venta } = productRemoved[0];

        lastCart.valor_venta -= valor_venta;
        lastCart.ivaventa -= valoriva;
        lastCart.total_venta -= valor_total;

        const lastProducts = lastCart.detalleVenta.filter(p => p.codigo_producto !== product.codigo_producto);
        lastCart.detalleVenta = lastProducts;
        setCart(lastCart);
    }

    const isDuplicate = product => {
        return cart.detalleVenta.some(p => p.codigo_producto && product.codigo_producto === p.codigo_producto);
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
        sale.cedula_cliente = identification;

        try {
            setSaleLoading(true);
            const { data } = await api.post(microservicesUri.sales, sale);
            Swal.fire({
                title: "Venta realizada",
                text: data.message,
                icon: "success"
            })
            navigate("/sales")
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate)
            setSaleLoading(false)
        }
    }

    return (
        <>
            {cart.detalleVenta.length > 0 &&
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
                            <th>SubTotal</th>
                            <th>Iva</th>
                            <th>Total</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.detalleVenta.map(product => (
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
                <p className="h4">SubTotal: {cart.valor_venta}</p>
                <p className="h4">Total Iva: {cart.ivaventa}</p>
                <p className="h4">Total: {cart.total_venta}</p>
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
            <td>{product.nombre_producto}</td>
            <td>{product.cantidad_producto}</td>
            <td>{product.valor_venta}</td>
            <td>{product.valoriva}</td>
            <td>{product.valor_total}</td>
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