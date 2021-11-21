import React, { useEffect, useState } from 'react'
import './ProductForm.css'
import { api, microservicesUri } from '../../../config/axiosConfig';
import { HttpRequestOnActionHandler } from '../../../config/httpHandlers'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router';
import Spinner from '../../components/Spinner/Spinner';

export const ProductForm = () => {

    const { id = null } = useParams();

    const [product, setProduct] = useState({
        codigo_producto: "",
        nombre_producto: "",
        nitproveedor: "",
        ivacompra: "",
        precio_compra: "",
        precio_venta: ""

    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const readProduct = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }

    const editProduct = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await api.put(`${microservicesUri.products}${id}`, product);

            Swal.fire({
                icon: 'success',
                title: 'Producto editado',
                text: data.message,
            });
            setLoading(false);
            navigate("/products")
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate);
        }
    }

    useEffect(() => {
        if (id) {

            const getProduct = async () => {
                try {
                    setLoading(true)
                    const { data } = await api.get(`${microservicesUri.products}${id}`)
                    setProduct(data)
                    setLoading(false)
                } catch (error) {
                    HttpRequestOnActionHandler(error, navigate);
                    setLoading(false)
                }
            }

            getProduct();
        }
    }, [id, navigate])

    const createProduct = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await api.post(microservicesUri.products, product)
            Swal.fire({
                icon: 'success',
                title: 'Registro creado.',
                text: data.message,
            });
            setLoading(false);
            navigate("/products")
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate);
            setLoading(false);
        }
    }


    return (
        <section className="login-block">
            <div className="container-fluid">

                {loading &&
                    <Spinner />
                }
                <div className="row">
                    <div className="col-sm-12">
                        <form className="md-float-material form-material">
                            <div className="auth-box card">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="text-center heading">
                                                {id ? "Editar el producto" : "Crea un nuevo producto"}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="row mb-5 mt-4" >
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="codigo_producto"
                                                placeholder="Código del producto"
                                                value={product.codigo_producto}
                                                onChange={readProduct}
                                                disabled={loading || id ? true : false}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nombre_producto"
                                                placeholder="Nombre del producto"
                                                value={product.nombre_producto}
                                                onChange={readProduct}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nitproveedor"
                                                placeholder="Nit Proveedor"
                                                value={product.nitproveedor}
                                                onChange={readProduct}
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="ivacompra"
                                                placeholder="Iva"
                                                value={product.ivacompra}
                                                onChange={readProduct}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="precio_compra"
                                                placeholder="Precio de Compra"
                                                value={product.precio_compra}
                                                onChange={readProduct}
                                                disabled={loading}
                                            />
                                        </div>

                                        <div className="col">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="precio_venta"
                                                placeholder="Precio de Venta"
                                                value={product.precio_venta}
                                                onChange={readProduct}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col v-center ">

                                        {
                                            id != null ?
                                                <input type="submit"
                                                    className="btn btn-secondary waves-effect text-center m-b-20 d-block mx-auto"
                                                    value="Editar"
                                                    onClick={editProduct}
                                                    disabled={loading}
                                                />
                                                :
                                                <input type="submit"
                                                    className="btn btn-dark waves-effect text-center m-b-20 d-block mx-auto"
                                                    value="Crear"
                                                    onClick={createProduct}
                                                    disabled={loading}
                                                />
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}