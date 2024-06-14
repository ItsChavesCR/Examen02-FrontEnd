import { useEffect, useState } from "react";
import { GetAllEventos } from "../services/Evento";
import { EventoType } from "../types/EventoType";


// Función para obtener eventos filtrados por término de búsqueda
async function getFilteredEventos(searchTerm: string) {
    const allEventos = await GetAllEventos(); // Obtener todos los eventos
    return allEventos.filter(evento => 
        evento.SalaId.toString() === searchTerm // Filtrar por SalaId
    );
}

// HOOK PARA OBTENER TODOS LOS PRODUCTOS Y FILTRARLOS POR BÚSQUEDA
export default function useGetAllEventosSearch(searchTerm: string) {
    const [filteredEventos, setFilteredEventos] = useState<EventoType[]>([]);

    useEffect(() => {
        async function fetchFilteredEventos() {
            try {
                const products = await getFilteredEventos(searchTerm); 
                setFilteredEventos(products);
            } catch (error) {
                console.error("Error al obtener productos", error);
            }
        }

        fetchFilteredEventos();
    }, [searchTerm]);

    return { filteredEventos };
}