import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TipoEventoType } from "../types/TipoEventoType";
import { GetAllTipoEvento } from "../services/TipoEvento";
import { GetAllSalas } from "../services/Sala";
import { EventoType } from "../types/EventoType";
import { AddEvento } from "../services/Evento";
import { SalaType } from "../types/SalaType";
import { useNavigate } from "react-router-dom";
import '../styles/RegisterEvento.css'

const FormularioReservaEvento = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [tipoEvento, setTipoEvento] = useState<TipoEventoType[]>([]);
    const [sala, setSala] = useState<SalaType[]>([]);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await GetAllSalas();
                setSala(data);
            } catch (error) {
                setError("Error al obtener las sala: " + error.message);
                console.error("Error al obtener las sala:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await GetAllTipoEvento();
                setTipoEvento(data);
            } catch (error) {
                setError("Error al obtener los tipos de evento: " + error.message);
                console.error("Error al obtener los tipos de evento:", error);
            }
        }
        fetchData();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        const EventoData: EventoType = {
            ...data,
            TipoEventoId: parseInt(data.TipoEventoId), // Asegúrate de que el ID sea un número
            SalaId: parseInt(data.SalaId),             // Asegúrate de que el ID sea un número
        };
        try {
            await AddEvento(EventoData);
            navigate('/vieweventos');
        } catch (error) {
            console.error('Error creating:', error);
        }
    });

    const handleCancel = () => {
        navigate('/');
    }

    const handleHome = () => {
        navigate('/');
    }

    return (
        <>
            <div className='container-button-back'>
                <button className='button-back' type='button' onClick={handleCancel} aria-label="Volver">
                    <img className='arrowback' src="/src/assets/ArrowBack.svg" alt="" />
                </button>
            </div>

            <div className='Container_form'>
                <form onSubmit={onSubmit}>
                    <label><strong>Nombre</strong></label>
                    <br />
                    <input {...register('name')} />
                    <br />

                    <label htmlFor='TipoEventoId'><strong>Tipo Evento</strong></label>
                    <br />
                    <select {...register('TipoEventoId', { required: true })} id='TipoEventoId' required>
                        {tipoEvento.map((tipoEvento) => (
                            <option key={tipoEvento.id} value={tipoEvento.id}>{tipoEvento.nombre}</option>
                        ))}
                    </select>
                    <br />

                    <label htmlFor='SalaId'><strong>Salas</strong></label>
                    <br />
                    <select {...register('SalaId', { required: true })} id='SalaId' required>
                        {sala.map((sala) => (
                            <option key={sala.id} value={sala.id}>{sala.nombre}</option>
                        ))}
                    </select>
                    <br />

                    <label>
                        <strong>Fecha Inicio</strong>
                        <br />
                        <input type="datetime-local" {...register('fechaInicio', { required: true })} />
                    </label>
                    <br />

                    <label>
                        <strong>Fecha Final</strong>
                        <br />
                        <input type="datetime-local" {...register('fechaFinal', { required: true })} />
                    </label>
                    <br />

                    <div className='confirm-input'>
                        <button onClick={handleHome} className='Button' type='submit'>Guardar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormularioReservaEvento;
