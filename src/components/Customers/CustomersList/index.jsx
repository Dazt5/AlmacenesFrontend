import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { api, microservicesUri } from '../../../config/axiosConfig';
import { HttpRequestOnActionHandler } from '../../../config/httpHandlers';
import { BottomTableButton } from '../../common/Buttons/BottomTableButton';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import * as BsIcons from 'react-icons/bs';
import Spinner from '../../common/Spinner/Spinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


export const CustomerList = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getCustomers = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(microservicesUri.customers);
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        getCustomers()
        //eslint-disable-next-line
    }, [])

    return (

        <div className="content">
            <div className="container">

                {loading && <Spinner />}

                {customers.length <= 0 && !loading ?
                    <ErrorMessage
                        message={"No existen clientes registrados"}
                    />
                    :
                    <div className="table-responsive custom-table-responsive">

                        <table className="table custom-table">
                            <thead>
                                <tr>
                                    <th>Cédula</th>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Teléfono</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => (
                                    <Customer
                                        key={customers.cedula_cliente}
                                        customer={customer}
                                        getCustomers={getCustomers}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                }

                <div className="action-buttons">
                    <BottomTableButton
                        text="Crear Cliente"
                        route="/customer/new"
                    />
                </div>
            </div>
        </div>
    )
}

const Customer = ({ customer, getCustomers }) => {

    const navigate = useNavigate();

    const deleteCustomer = async () => {
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
                    const { data } = await api.delete(`${microservicesUri.customers}${customer.cedula_cliente}`)

                    Swal.fire(
                        'Eliminado!',
                        data.message,
                        'success'
                    );
                    getCustomers();
                } catch (error) {
                    HttpRequestOnActionHandler(error, navigate)
                }
            }
        });
    }

    return (
        <tr>
            <td>{customer.cedula_cliente}</td>
            <td>{customer.nombre_cliente}</td>
            <td>{customer.direccion_cliente}</td>
            <td>{customer.telefono_cliente}</td>
            <td>{customer.email_cliente}</td>
            <td>
                <div className="table-buttons">
                    <BsIcons.BsTrashFill className="trash-icon" onClick={deleteCustomer} />
                    <Link to={`/product/edit/${customer.cedula_cliente}`}>
                        <BsIcons.BsPencilSquare className="pencil-icon" />
                    </Link>
                </div>
            </td>
        </tr>
    )
}