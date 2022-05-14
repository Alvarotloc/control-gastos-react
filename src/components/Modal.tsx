import { useState, FormEvent, useEffect } from 'react';
import CerrarBtn from '../img/cerrar.svg';
import Mensaje from './Mensaje';
import { InterGasto } from '../App';

interface IModal{
    setModal : Function
    animarModal : boolean,
    setAnimarModal : Function,
    guardarGasto : Function,
    gastoEditar : InterGasto,
    setGastoEditar : Function
}


const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto,gastoEditar,setGastoEditar}:IModal):JSX.Element => {

    const [nombre, setNombre] = useState<string>('');
    const [cantidad, setCantidad] = useState<number>(0);
    const [categoria, setCategoria] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [fecha, setFecha] = useState<number>(0)
    const [id, setId] = useState<string>('')

    useEffect(() => {
        if(gastoEditar?.nombre.trim() !== ''){
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha)
          }
    },[]);

    const ocultarModal = () => {
        setGastoEditar({id:'',nombre:'',cantidad:0,categoria:'',fecha:0});
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault();

        if([nombre,cantidad,categoria].includes('')){
            return setMensaje('Todos los campos son obligatorios');
        }
        setMensaje('');
        guardarGasto({nombre,cantidad,categoria,id,fecha});
    }

  return (
    <div className='modal'>
        <div className="cerrar-modal">
            <img src={CerrarBtn} alt="Icono de cruz para cerrar la modal" onClick={ocultarModal}/>
        </div>
        <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} onSubmit={handleSubmit}>
            <legend>{gastoEditar.nombre.trim() !== '' ? 'Editando Gasto' : 'Nuevo Gasto'}</legend>
            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input type="text" placeholder='Añade el nombre del gasto' id='nombre' value={nombre} onChange={e => setNombre(e.target.value)}/>
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input type="number" placeholder='Añade la cantidad ej 300' id='cantidad' value={cantidad} onChange={e => setCantidad(Number(e.target.value))}/>
            </div>
            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input type="submit" value={gastoEditar.nombre.trim() !== '' ? 'Guardar Cambios' : 'Añadir Gasto'} />
        </form>
    </div>
  )
}

export default Modal