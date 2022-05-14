import Header from "./components/Header";
import { useState, useEffect } from "react";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";

export interface InterGasto {
  id: string;
  nombre: string;
  cantidad: number;
  categoria: string;
  fecha: number;
}

const App = (): JSX.Element => {
  const [presupuesto, setPresupuesto] = useState<number>(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [validPresupuesto, setValidPresupuesto] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [animarModal, setAnimarModal] = useState<boolean>(true);
  const [gastos, setGastos] = useState<InterGasto[]>(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos") as any)
      : []
  );
  const [gastoEditar, setGastoEditar] = useState<InterGasto>({
    id: "",
    nombre: "",
    cantidad: 0,
    categoria: "",
    fecha: 0,
  });
  const [filtro, setFiltro] = useState<string>("");
  const [gastosFiltrados, setGastosFiltrados] = useState<InterGasto[]>([]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltradosConst = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltradosConst);
    }
  }, [filtro]);

  useEffect(() => {
    if (gastoEditar?.nombre.trim() !== "") {
      handleNuevoGasto();
    }
  }, [gastoEditar]);

  useEffect(() => {
    Number(localStorage.setItem("presupuesto", presupuesto.toString() ?? 0));
  }, [presupuesto]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLS > 0) {
      setValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  const handleNuevoGasto = (reset: boolean = false) => {
    setModal(true);
    if (reset) {
      setGastoEditar({
        id: "",
        nombre: "",
        cantidad: 0,
        categoria: "",
        fecha: 0,
      });
    }

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto: InterGasto) => {
    if (gasto.id.trim() !== "") {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({
        id: "",
        nombre: "",
        cantidad: 0,
        categoria: "",
        fecha: 0,
      });
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id: string) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
      setGastos={setGastos}
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        validPresupuesto={validPresupuesto}
        setValidPresupuesto={setValidPresupuesto}
      />
      {validPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono de agregar gasto"
              onClick={() => handleNuevoGasto(true)}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          gastoEditar={gastoEditar}
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
};

export default App;
