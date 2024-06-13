import { TipoEventoType } from "../types/TipoEventoType";

export const GetAllTipoEvento = async (): Promise<TipoEventoType[]> => {
              const response = await fetch('http://localhost:5081/api/TipoEvento');
              if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
              }
              return response.json();
            };