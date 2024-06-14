import { EventoType } from "../types/EventoType";



export async function AddEvento(EventoData: EventoType) {
              const res = await fetch('http://localhost:5081/api/Eventos', {
                            method: 'POST',
                            headers: {
                                          'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(EventoData)
              })
              return res.json();
}

export const GetAllEventos = async (): Promise<EventoType[]> => {
              const response = await fetch('http://localhost:5081/api/Eventos');
              if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
              }
              return response.json();
            };



            export async function getAllEventosSearch(searchTerm: string) {
              let response;
              try {
                  const url = new URL('http://localhost:5081/api/Eventos');
                  url.searchParams.append('sortBy', 'title');
                  url.searchParams.append('order', 'desc');
          
                  response = await fetch(url, {
                      method: 'GET',
                      headers: { 'Content-Type': 'application/json' },
                  });
                  if (!response.ok) throw new Error('Error al obtener eventos');
              } catch (error) {
                  console.error('Error al hacer fetching: ', error);
                  throw error;
              } finally {
                  console.log('Fetching de eventos finalizado');
              }
          
              try {
                  const responseData: EventoType[] = await response.json();
                  const filteredEventos = responseData.filter((eventos: EventoType) =>
                      eventos.Name.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  return filteredEventos;
              } catch (error) {
                  console.error(error);
                  throw error;
              }
          }