import React, { useState, useEffect } from 'react';
import { EventoType } from '../types/EventoType';
import { GetAllEventos } from '../services/Evento';
import SingleEvento from './SingleEvento';


const   SearchEventos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allEventos, setAllEventos] = useState<EventoType[]>([]);
  const [filteredEventos, setFilteredEventos] = useState<EventoType[]>([]);

  useEffect(() => {
    // Cargar todos los eventos al iniciar la página
    const fetchEventos = async () => {
      try {
        const eventos = await GetAllEventos();
        setAllEventos(eventos);
        setFilteredEventos(eventos); // Mostrar todos los eventos al cargar la página
      } catch (error) {
        console.error("Error al obtener eventos", error);
      }
    };

    fetchEventos();
  }, []);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.trim(); // Asegurar que se limpie el término de búsqueda
    setSearchTerm(term);
    try {
      if (term === '') {
        setFilteredEventos(allEventos); // Mostrar todos los eventos si el término está vacío
      } else {
        const eventos = await getFilteredEventos(term); // Utilizar la función corregida
        setFilteredEventos(eventos);
      }
    } catch (error) {
      console.error("Error al obtener eventos filtrados", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar eventos por SalaId..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="inputsearch"
      />
      <section className='ContenedorEventos'>
        {filteredEventos?.map((eventoResult: EventoType) => (
          <SingleEvento
            key={eventoResult.Id}
            eventos={eventoResult} 
          />
        ))}
      </section>
    </div>
  );
}

export default SearchEventos;
