import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from './ControlPresupuesto';
import { InterGasto } from '../App';


interface HeaderParams {
  presupuesto: number;
  setPresupuesto: Function;
  validPresupuesto: boolean;
  setValidPresupuesto: Function;
  gastos : InterGasto[],
  setGastos : Function
}
const Header = ({
  presupuesto,
  setPresupuesto,
  validPresupuesto,
  setValidPresupuesto,
  gastos,
  setGastos
}: HeaderParams): JSX.Element => {
  return (
    <header>
      <h1>Planificador de gastos</h1>

      {validPresupuesto ? (
        <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} setGastos={setGastos} setPresupuesto={setPresupuesto} setValidPresupuesto={setValidPresupuesto}/>
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setValidPresupuesto={setValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
