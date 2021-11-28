import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { api, microservicesUri } from '../../../config/axiosConfig';
import { HttpRequestOnActionHandler } from '../../../config/httpHandlers';
import { BottomTableButton } from '../../common/Buttons/BottomTableButton';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';


export const ProviderList = () => {

    const [providers, setProviders] = useState([])
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getProviders = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(microservicesUri.providers);
            setProviders(data);
            setLoading(false);
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        
        getProviders()
        //eslint-disable-next-line
    }, [])

    return (
        <div className="content">
            <div className="container">

                {loading && <Spinner />}

                {providers.length <= 0 && !loading ?
                    <ErrorMessage
                        message={"No existen proveedores registrados"}
                    />
                    :
                    <div className="table-responsive custom-table-responsive">

                        <table className="table custom-table">
                            <thead>
                                <tr>
                                    <th>NIT</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Dirección</th>
                                    <th>Ciudad</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {providers.map(provider => (
                                    <Provider
                                        key={provider.nitproveedor}
                                        provider={provider}
                                        getProviders={getProviders}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                }

                <div className="action-buttons">
                    <BottomTableButton
                        text="Crear proveedor"
                        route="/provider/new"
                    />
                </div>
            </div>
        </div>
    )
}

const Provider = ({ provider, getProviders}) => {
    
    const navigate = useNavigate();

    const deleteProvider = async () => {
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
                    const { data } = await api.delete(`${microservicesUri.providers}${provider.nitproveedor}`)

                    Swal.fire(
                        'Eliminado!',
                        data.message,
                        'success'
                    );
                    getProviders();
                } catch (error) {
                    HttpRequestOnActionHandler(error, navigate)
                }
            }
        });
    }

    return (
        <tr>
            <td>{provider.nitproveedor}</td>
            <td>{provider.nombre_proveedor}</td>
            <td>{provider.telefono_proveedor}</td>
            <td>{provider.direccion_proveedor}</td>
            <td>{provider.ciudad_proveedor}</td>
            <td>
                <div className="table-buttons">
                    <BsIcons.BsTrashFill className="trash-icon" onClick={deleteProvider} />
                    <Link to={`/provider/edit/${provider.nitproveedor}`}>
                        <BsIcons.BsPencilSquare className="pencil-icon" />
                    </Link>
                </div>
            </td>
        </tr>
    )

}