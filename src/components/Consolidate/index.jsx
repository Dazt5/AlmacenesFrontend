import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api, microservicesUri } from '../../config/axiosConfig';
import { HttpRequestOnActionHandler } from '../../config/httpHandlers';
import ErrorMessage from '../common/ErrorMessage/ErrorMessage';
import Spinner from '../common/Spinner/Spinner';

export const Consolidate = () => {

    const [consolidate, setConsolidate] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const generateConsolidate = async () => {
        try {
            const { data } = await api.get(microservicesUri.consolidate);
            setConsolidate(data);
        } catch (error) {
            HttpRequestOnActionHandler(error, navigate)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        generateConsolidate();
        //eslint-disable-next-line
    }, [])

    return (
        <div className="content">
            <div className="container">

                {loading && <Spinner />}

                {!consolidate && !loading ?
                    <ErrorMessage
                        message={"No existen ventas que consolidar"}
                    />
                    :
                    !loading &&
                    <div className="table-responsive custom-table-responsive">

                        <table className="table custom-table">
                            <thead>
                                <tr>
                                    <th>Ciudad</th>
                                    <th>Ventas totales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consolidate.subsidiaries &&
                                    consolidate.subsidiaries.map(s => (
                                        <SubsidiaryConsolidate
                                            key={s.id}
                                            subsidiary={s}
                                        />
                                    ))}
                            </tbody>
                        </table>
                        <p className='text-center text-light h3'>Total consolidado: {consolidate.total} </p>
                    </div>
                }
            </div>
        </div>
    );
}

const SubsidiaryConsolidate = ({ subsidiary }) => {
    return (
        <tr>
            <td>{subsidiary.ciudad}</td>
            <td>{subsidiary.total_ventas}</td>
        </tr>

    )
}