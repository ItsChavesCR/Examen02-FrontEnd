
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventoType } from '../types/EventoType';
import { GetAllEventos } from '../services/Evento';
import '../styles/TableEventos.css'
import SearchEventos from './SearchEventos';

const EventosRealizados = () => {
const [evento, setEvento] = useState<EventoType[]>([]);

const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/')
    }

useEffect(() => {
              async function fetchData() {
                  try {
                      const data = await GetAllEventos();
                      setEvento(data);
                  } catch (error) {
                      setError("Error al obtener los tipos de evento: " +error.message);
                      console.error("Error al obtener los tipos de evento:", error);
                  }
              }
      
              fetchData();
          }, []);

  return (
<>
<SearchEventos/>
    <div className='container-button-back'>
    <button className='button-back' type='submit' onClick={handleCancel} aria-label="Volver"> 
    <img className='arrowback' src="/src/assets/ArrowBack.svg" alt="" />
    </button>
    </div>

    <div>
      <h2>Eventos</h2>
      <table className="evento">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo Evento</th>
            <th>Sala</th>
            {/* <th> Fecha</th> */}
           
          </tr>
        </thead>
        <tbody>
        {evento.map((evento) => (
            <tr key={evento.id} >
             <td>{evento.id}</td>
                <td>{evento.name}</td>
                <td>{evento.tipoEventoId}</td>
                <td>{evento.salaId}</td>
            </tr>
          ))}
        
        </tbody>
      </table>
    </div>
    </>
  );
};

export default EventosRealizados