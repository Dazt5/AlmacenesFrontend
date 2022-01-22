import Swal from "sweetalert2";

export const HttpRequestOnActionHandler = (error, navigate) => {
    if (!error.request.status) {
        Swal.fire(
            'Error desconocido',
            'Ha ocurrido un error desconocido intente de nuevo',
            'error'
        )
    }

    const httpStatusCode = error.request.status;

    if (httpStatusCode === 0) {
        Swal.fire(
            'Error de conexión',
            'Ha ocurrido un error de conexión con el servidor',
            'error'
        )
        navigate("/")
    } else if (httpStatusCode >= 500 && httpStatusCode <= 511) {
        Swal.fire(
            'Error inesperado',
            'Ha ocurrido un error inesperado',
            'error'
        )
    } else if (httpStatusCode >= 400 && httpStatusCode <= 499) {
        const { message } = error.response.data;

        if (httpStatusCode === 403 || httpStatusCode === 401) {
            Swal.fire({
                icon: 'error',
                title: 'Sesión caducada',
                text: 'Su sesión ha caducado, inicie sesión de nuevo',
            });

            navigate("/")
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error.',
                text: message,
            })
        }
    }
}