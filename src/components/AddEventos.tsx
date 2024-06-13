import { Link } from "react-router-dom"
import '../styles/AddEventos.css'
const AddEventos = () => {
              return (
                <div className='container-button'>
                <Link className='addevento' to={'/addevento'}>Registrar Evento</Link>
               
              </div>
              )
            }

            export default AddEventos