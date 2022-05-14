import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { InterGasto } from "../App";
import { formatearFecha } from "../helpers/index";
import IconoAhorro from "../img/icono_ahorro.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";

interface IDiccionario {
  ahorro: string;
  comida: string;
  casa: string;
  gastos: string;
  ocio: string;
  salud: string;
  suscripciones: string;
}

const diccionarioIconos: IDiccionario = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones,
};

interface IGasto {
  gasto: InterGasto;
  setGastoEditar : Function,
  eliminarGasto : Function
}

const Gasto = ({ gasto,setGastoEditar,eliminarGasto }: IGasto): JSX.Element => {
  const { categoria, nombre, cantidad, id, fecha } = gasto;

  const leadingActions = () => (
      <LeadingActions>
          <SwipeAction onClick={() => setGastoEditar(gasto)}>
            Editar
          </SwipeAction>
      </LeadingActions>
  )

  const trailingActions = () => (
      <TrailingActions>
          <SwipeAction onClick={() => eliminarGasto(id)} destructive={true}>
            Eliminar
          </SwipeAction>
      </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img
              src={diccionarioIconos[categoria as keyof IDiccionario]}
              alt="Icono Gasto"
            />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: {""} <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{cantidad}€</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
