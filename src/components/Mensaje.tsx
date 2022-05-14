
interface MessageParams {
    children : string,
    tipo : string
}
const Mensaje = ({children,tipo}:MessageParams):JSX.Element => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje