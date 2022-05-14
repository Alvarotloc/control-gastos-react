export const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
}

export const formatearFecha = (fecha:number) => {
    const fechaNueva = new Date(fecha);

    interface IOpciones {
        year : 'numeric',
        day : '2-digit',
        month : 'long'
    }

    const opciones:IOpciones = {
        year : 'numeric',
        month : 'long',
        day : '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES',opciones)
}