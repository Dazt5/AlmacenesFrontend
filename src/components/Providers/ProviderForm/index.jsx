import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { api, microservicesUri } from '../../../config/axiosConfig';
import { HttpRequestOnActionHandler } from '../../../config/httpHandlers';

export const ProviderForm = () => {
    
    const { id = null } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [provider, setProvider] = useState({
        nitproveedor: "",
        nombre_proveedor: "",
        telefono_proveedor: "",
        direccion_proveedor: "",
        ciudad_proveedor: "",
    });

    const createProvider = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await api.post(microservicesUri.providers, provider)

            Swal.fire({
                icon: 'success',
                title: 'Registro creado.',
                text: data.message,
            });
            setLoading(false);
            navigate("/providers")
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate);
            setLoading(false);
        }
    }

    const editProvider = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await api.put(`${microservicesUri.providers}${id}`, provider);

            Swal.fire({
                icon: 'success',
                title: 'Cliente editado',
                text: data.message,
            });
            setLoading(false);
            navigate("/providers")
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate);
        }
    }

    const readProvider = e => {
        setProvider({
            ...provider,
            [e.target.name]: e.target.value
        });
    }

    
    useEffect(() => {
        if (id) {
            const getProvider = async () => {
                try {
                    setLoading(true)
                    const { data } = await api.get(`${microservicesUri.providers}${id}`)
                    setProvider(data)
                    setLoading(false)
                } catch (error) {
                    HttpRequestOnActionHandler(error, navigate);
                    setLoading(false)
                }
            }
            getProvider();
        }
    }, [id, navigate])

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
                                                {id ? "Editar el proveedor" : "Crea un nuevo proveedor"}
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
                                                        name="nitproveedor"
                                                        placeholder="Nit del Proveedor"
                                                        value={provider.nitproveedor}
                                                        onChange={readProvider}
                                                        disabled={loading || id ? true : false}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="nombre_proveedor"
                                                        placeholder="Nombre del Proveedor"
                                                        value={provider.nombre_proveedor}
                                                        onChange={readProvider}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-5">
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="telefono_proveedor"
                                                        placeholder="Teléfono del Proveedor"
                                                        value={provider.telefono_proveedor}
                                                        onChange={readProvider}
                                                        disabled={loading}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="direccion_proveedor"
                                                        placeholder="Dirección del Proveedor"
                                                        value={provider.direccion_proveedor}
                                                        onChange={readProvider}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="ciudad_proveedor"
                                                        placeholder="Ciudad del proveedor"
                                                        value={provider.ciudad_proveedor}
                                                        onChange={readProvider}
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
                                                    onClick={editProvider}
                                                    disabled={loading}
                                                />
                                                :
                                                <input type="submit"
                                                    className="btn btn-dark waves-effect text-center m-b-20 d-block mx-auto"
                                                    value="Crear"
                                                    onClick={createProvider}
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