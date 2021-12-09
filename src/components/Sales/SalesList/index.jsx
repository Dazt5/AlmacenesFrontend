import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import * as MdIcons from 'react-icons/md';
import './SalesList.css';
//import { api, microservicesUri } from '../../../config/axiosConfig';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import Spinner from '../../common/Spinner/Spinner';
//import { HttpRequestOnActionHandler } from '../../../config/httpHandlers';
//import { useNavigate } from 'react-router';
import { BottomTableButton } from '../../common/Buttons/BottomTableButton';
import { SalesMock } from '../SalesMock';

export const SalesList = () => {

    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);

    //const navigate = useNavigate();

    const getSales = async () => { 
        setLoading(true);
        setSales(SalesMock);
        setLoading(false);
    }

    useEffect(() => {

        getSales();
        //eslint-disable-next-line
    }, [])

    return (
        <div className="content">
            <div className="container">

                {loading && <Spinner />}

                {sales.length <= 0 && !loading ?
                    <ErrorMessage
                        message={"No existen ventas registradas"}
                    />
                    :

                    <div className="table-responsive custom-table-responsive">

                        <table className="table custom-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Codigo</th>
                                    <th>Cedula Cliente</th>
                                    <th>Valor</th>
                                    <th>Iva</th>
                                    <th>Valor Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map(sale => (
                                    <Sale
                                        key={sale.codigo_venta}
                                        sale={sale}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                }

                <div className="action-buttons">
                    <BottomTableButton
                        text="Generar venta"
                        route="/sale/new"
                    />
                </div>
            </div>
        </div>
    );
}

const Sale = ({ sale }) => {

    return (
        <tr>
            <td className="sale-detail">{<MdIcons.MdOutlineStickyNote2/>}</td>
            <td>{sale.codigo_venta}</td>
            <td>{sale.cedula_cliente}</td>
            <td>{sale.valor_venta}</td>
            <td>{sale.ivaventa}</td>
            <td>{sale.total_venta}</td>
        </tr>
    )
}
