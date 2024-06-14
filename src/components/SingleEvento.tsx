

import { EventoType } from "../types/EventoType";

export default function SingleEvento({ eventos }: { eventos : EventoType }) {
  return (
    <>
    <section>
        <h1>{eventos.Name}</h1>
        <p>{eventos.TipoEventoId}</p>
        <p>{eventos.SalaId}</p>
        

    </section>
    </>
  );
}