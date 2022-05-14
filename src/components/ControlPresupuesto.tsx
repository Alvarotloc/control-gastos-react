import { useEffect, useState } from "react";
import { InterGasto } from "../App";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
interface ControlPreParams {
  presupuesto: number;
  gastos: InterGasto[];
  setGastos: Function;
  setPresupuesto : Function,
  setValidPresupuesto :Function
}

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setValidPresupuesto
}: ControlPreParams): JSX.Element => {
  const [porcentaje, setPorcentaje] = useState<number>(0);
  const [disponible, setDisponible] = useState<number>(0);
  const [gastado, setGastado] = useState<number>(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje = Number(
      (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
    );

    setDisponible(totalDisponible);
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1500);
  }, [gastos]);

  const formatearCantidad = (cantidad: number) =>
    cantidad.toLocaleString("en-ES", {
      style: "currency",
      currency: "EUR",
    });

    const handleReset = () => {
      const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');
      if(resultado){
        setGastos([]);
        setPresupuesto(0);
        setValidPresupuesto(false);
      }
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <CircularProgressbar
        value={porcentaje}
        text={`${porcentaje}% gastado`}
        styles={buildStyles({
          pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          trailColor: "#F5F5F5",
          pathTransitionDuration: 0.5,
          textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
        })}
      />
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleReset}>Resetear App</button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
