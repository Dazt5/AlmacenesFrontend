import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { api } from '../../config/axiosConfig';
import './styles.css';
import { HttpRequestOnActionHandler } from '../../config/httpHandlers';
import { microservicesUri } from '../../config/axiosConfig';
import Spinner from '../common/Spinner/Spinner'
import Swal from 'sweetalert2';

export const LoginForm = () => {

    const [credentials, setCredentials] = useState({});
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const readCredentials = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const login = async (e) => {
        e.preventDefault();
        try {

            if (credentials.subsidiary.length <= 0) {
                return Swal.fire({
                    "icon": "error",
                    "title": "Seleccione una sucursal",
                });
            }

            setLoading(true);
            const { data } = await api.post(microservicesUri.login, credentials);
            const { token } = data;

            if (token) {
                localStorage.setItem("token", token);
            }
            setLoading(false);
            navigate("/products")

        } catch (error) {
            HttpRequestOnActionHandler(error);
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-key">
                        <i className="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <div className="col-lg-12 login-title">
                        INGRESAR
                    </div>

                    {loading === true &&
                        <Spinner />
                    }

                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form onSubmit={login}>
                                <div className="form-group">
                                    <label className="form-control-label">USUARIO</label>
                                    <input type="text" className="form-control" name="usuario" onChange={readCredentials} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">CONTRASEÑA</label>
                                    <input type="password" className="form-control" name="password" onChange={readCredentials} />
                                </div>

                                <div className="col-lg-12 loginbttm">
                                    <div className="form-group">
                                        <p className="text-center mb-3">Sucursales</p>
                                        <select
                                            className="form-control text-center"
                                            name="subsidiary"
                                            onChange={readCredentials}
                                        >
                                            <option value="">----- SELECCIONE LA SUCURSAL -----</option>
                                            <option value="1">Bogotá</option>
                                            <option value="2">Cali</option>
                                            <option value="3">Medellín</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-12 login-btm login-button">
                                        <button
                                            type="submit"
                                            className="btn btn-outline-primary d-block mx-auto"
                                            disabled={loading}
                                        >
                                            ENTRAR</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
        </div>
    )
}

