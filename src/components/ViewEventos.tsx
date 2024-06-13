import { Link } from 'react-router-dom'
import '../styles/ViewEventos.css'

const ViewEventos = () => {
  return (
    <div className='container-button'>
    <Link className='view-evento' to={'/vieweventos'}>Ver Eventos</Link>
  </div>
  )
}

export default ViewEventos