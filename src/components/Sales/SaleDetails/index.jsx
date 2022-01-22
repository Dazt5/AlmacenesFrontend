import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, microservicesUri } from '../../../config/axiosConfig';
import { HttpRequestOnActionHandler } from '../../../config/httpHandlers';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import Spinner from '../../common/Spinner/Spinner';
import './SaleDetails.css'

export const SaleDetail = () => {

    const { id = null } = useParams();
    const navigate = useNavigate();

    const [saleDetail, setSailDetail] = useState({});
    const [loading, setLoading] = useState(false);


    const getSaleDetail = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`${microservicesUri.sales}${id}`)
            
            if (!data) {
                return navigate('/sales')
            }

            setSailDetail(data);
            setLoading(false);
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate)
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id && id.trim().length > 0) {

            getSaleDetail();
        } else {
            navigate('/sales')
        }

        //eslint-disable-next-line
    }, [id, navigate])

    return (
        <div className="content">
            <div className="container">

                {loading && <Spinner />}

                {!saleDetail && !loading ?
                    <ErrorMessage
                        message={"La venta que intenta buscar no existe"}
                    />
                    :
                    <>
                        <h4 className='text-light text-center'>Resumen</h4>

                        <p className='text-light text-center h5'>Codigo de la venta: <strong> {saleDetail.codigo_venta}</strong></p>
                        <p className='text-light text-center h5'>Subtotal: <strong className='resumen-text'>{saleDetail.valor_venta}</strong></p>
                        <p className='text-light text-center h5'>Iva Total: <strong className='resumen-text'>{saleDetail.ivaventa}</strong></p>
                        <p className='text-light text-center h5'>Total:<strong className='resumen-text'>{saleDetail.total_venta}</strong></p>

                        <div className="table-responsive custom-table-responsive">
                            <h4 className='text-light text-center'>Productos Comprados</h4>
                            <table className="table custom-table">
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Nombre del producto</th>
                                        <th>Cantidad comprados</th>
                                        <th>Precio</th>
                                        <th>Iva</th>
                                        <th>Precio Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {saleDetail.detalleVenta && saleDetail.detalleVenta.length > 0 &&
                                        saleDetail.detalleVenta.map(p => (
                                            <ProductSold
                                                key={p.codigo_producto}
                                                product={p}

                                            />
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                }
            </div>
        </div>

    )

}

const ProductSold = ({ product }) => {

    return (
        <tr>
            <td>{product.codigo_producto}</td>
            <td>{product.nombre_producto}</td>
            <td>{product.cantidad_producto}</td>
            <td>{product.valor_total}</td>
            <td>{product.valor_venta}</td>
            <td>{product.valoriva}</td>
        </tr>
    )

}