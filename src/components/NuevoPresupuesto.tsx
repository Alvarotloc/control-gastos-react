import { FormEvent, useState } from 'react';
import Mensaje from './Mensaje';

interface PresuParams {
  presupuesto: number;
  setPresupuesto: Function;
  setValidPresupuesto : Function
}

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setValidPresupuesto
}: PresuParams): JSX.Element => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e:FormEvent) => {
        e.preventDefault();

        if(!presupuesto || presupuesto < 0){
            return setMensaje('No es un presupuesto válido');
        }

        setMensaje('');
        setValidPresupuesto(true);
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handlePresupuesto}>
        <div className="campo">
          <label>Definir Presupuesto</label>
          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Añade tu presupesto"
            value={presupuesto}
            onChange={e => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Añadir" />

        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
