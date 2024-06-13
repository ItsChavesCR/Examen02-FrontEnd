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