import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { api, microservicesUri } from '../../../config/axiosConfig';
import { HttpRequestOnActionHandler } from '../../../config/httpHandlers';


export const CustomerForm = () => {

    const { id = null } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [customer, setCustomer] = useState({
        cedula_cliente: "",
        nombre_cliente: "",
        direccion_cliente: "",
        telefono_cliente: "",
        email_cliente: ""
    });

    const createCustomer = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await api.post(microservicesUri.customers, customer)

            Swal.fire({
                icon: 'success',
                title: 'Registro creado.',
                text: data.message,
            });
            setLoading(false);
            navigate("/customers")
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate);
            setLoading(false);
        }
    }

    const editCustomer = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await api.put(`${microservicesUri.customers}${id}`, customer);

            Swal.fire({
                icon: 'success',
                title: 'Cliente editado',
                text: data.message,
            });
            setLoading(false);
            navigate("/customers")
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate);
        }
    }

    useEffect(() => {
        if (id) {
            const getCustomer = async () => {
                try {
                    setLoading(true)
                    const { data } = await api.get(`${microservicesUri.customers}${id}`)
                    setCustomer(data)
                    setLoading(false)
                } catch (error) {
                    HttpRequestOnActionHandler(error, navigate);
                    setLoading(false)
                }
            }
            getCustomer();
        }
    }, [id, navigate])

    const readCustomer = e => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    }

    return (
        <section className="form-block">
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
                                                {id ? "Editar el cliente" : "Crea un nuevo cliente"}
                                            </h3>
                                        </div>
                                    </div>

                                    {
                                        <>
                                            <div className="row mb-5 mt-4" >
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="cedula_cliente"
                                                        placeholder="Cédula del Cliente"
                                                        value={customer.cedula_cliente}
                                                        onChange={readCustomer}
                                                        disabled={loading || id ? true : false}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="nombre_cliente"
                                                        placeholder="Nombre del cliente"
                                                        value={customer.nombre_cliente}
                                                        onChange={readCustomer}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-5">
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="email_cliente"
                                                        placeholder="Email del cliente"
                                                        value={customer.email_cliente}
                                                        onChange={readCustomer}
                                                        disabled={loading}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="telefono_cliente"
                                                        placeholder="Teléfono del cliente"
                                                        value={customer.telefono_cliente}
                                                        onChange={readCustomer}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="direccion_cliente"
                                                        placeholder="Dirección del cliente"
                                                        value={customer.direccion_cliente}
                                                        onChange={readCustomer}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col v-center ">
                                        {
                                            id != null ?
                                                <input type="submit"
                                                    className="btn btn-secondary waves-effect text-center m-b-20 d-block mx-auto"
                                                    value="Editar"
                                                    onClick={editCustomer}
                                                    disabled={loading}
                                                />
                                                :
                                                <input type="submit"
                                                    className="btn btn-dark waves-effect text-center m-b-20 d-block mx-auto"
                                                    value="Crear"
                                                    onClick={createCustomer}
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