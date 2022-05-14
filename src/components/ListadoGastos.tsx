import { InterGasto } from "../App";
import Gasto from "./Gasto";

export interface IListado {
  gastos: InterGasto[];
  setGastoEditar: Function;
  eliminarGasto: Function;
  filtro: string;
  gastosFiltrados: InterGasto[];
}

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}: IListado): JSX.Element => {
  return (
    <div className="listado-gastos contenedor">

    { filtro ? (
      <>
            <h2>{gastosFiltrados.length ? "Gastos" : "Aún no hay gastos en esta categoría"}</h2>
      {gastosFiltrados.map((gasto) => (
        <Gasto
          key={gasto.id}
          gasto={gasto}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
        />
      ))}
      </>
    ) : (
      <>
      <h2>{gastos.length ? "Gastos" : "Aún no hay gastos"}</h2>
      {gastos.map((gasto) => (
        <Gasto
          key={gasto.id}
          gasto={gasto}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
        />
      ))}
      </>
    )}
    </div>
  );
};

export default ListadoGastos;
