import { SalaType } from "../types/SalaType";

export const GetAllSalas = async (): Promise<SalaType[]> => {
              const response = await fetch('http://localhost:5081/api/Sala');
              if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
              }
              return response.json();
            };