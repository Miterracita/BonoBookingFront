
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; // Para hacer una redirección
import Button from '../../Button/Button';
import Notification from '../../Notification/Notification';

import './FormBooking.css';

import { newBooking, updateBooking } from "../../../services/apiServicesBookings";
// import { getUsers } from "../../../services/apiServicesUsers";
// import { getBono } from "../../../services/apiServicesBonos";
import { getEvents } from "../../../services/apiServicesEvents";

export interface UserData {
    _id: string;
    userName: string;
    email: string;
    rol: string;
}

export interface BonoData {
    user?: UserData;
    expirationDate?: string;
    type?: string;
}

interface EventData {
    _id: string;
    name: string;
    description?: string;
    date: string;
    hour: number;
    capacity?: number;
}

export interface BookingData {
    _id?: string;
    localizador?: string;
    eventos?: EventData[];
    bono?: BonoData[];
}

interface FormBookingProps {
    bookingId?: string;
    initialData?: BookingData;
    onClose?: () => void;
}

const FormBooking = ({
    bookingId,
    initialData,
    onClose
}: FormBookingProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate(); // Hook para redirigir

    // const [bonos, setBonos] = useState<string[]>([]);
    const [events, setEvents] = useState<string[]>([]);
    const [notification, setNotification] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Para poder realizar la reserva es necesario cargar previamente la info
    // de bonos y eventos


    // // Fetch bono types from the API
    // const fetchBonos = async () => {
    //     try {
    //         const bonoData = await getBono();
    //         setBonos(bonoData);
    //     } catch (error:any) {
    //         setError(error.message || 'Error fetching bono');
    //     }
    // };

    //fetch al listado de eventos
    const fetchEvents = async () => {
        try {
            const eventsData = await getEvents();
            const eventName: string[] = eventsData.map((event:any) => event.name);
            setEvents(eventName);
            console.log(eventsData);
        } catch (error:any) {
            setError(error.message || 'Error fetching events');
        }
    };

    useEffect(() => {
        // fetchBonos();
        fetchEvents();
    }, []);



    useEffect(() => {

        // Si bookingId está presente, estamos editando; de lo contrario, estamos creando una nueva reserva
        if (bookingId) {
            reset(initialData);  // Resetea el formulario con los datos de la reserva a editar
        } else {
            // Si es un nueva nueva reserva los datos se resetean
            reset();
        }
    }, [bookingId, initialData, reset]);


    //submit del formulario de edición o creación de nueva reserva
    const onSubmit = useCallback(async (formData:any) => {
                
        try {
            if (bookingId) {
                // Actualiza el bono si existe bonoId
                await updateBooking(bookingId, formData);
                setNotification(`Reserva actualizada correctamente`);

                {onClose && (
                    setTimeout(() => {
                        onClose();
                    }, 2000)
                )}

            } else {
                // Crea un nuevo bono si no existe bonoId
                await newBooking(formData);
                console.log(`Reserva creada correctamente`);
                setNotification(`Reserva creada correctamente`);

                setTimeout(() => {
                    navigate('/gestion-reservas'); // Redirige después de crear el bono
                }, 2000)               
            }
        
            } catch (error: any) {
                console.error('Error:', error);
                setError(error.message || (bookingId ? 'Error al actualizar la reserva' : 'Error al crear la reserva'));
        }
    }, [bookingId, navigate, onClose]);

    //cerrar las notificaciones
    const handleCloseNotification = useCallback(() => { 
        setError(null);
        setNotification(null);
    }, []);

  return (
    <div className="box-booking-form">
        {notification && <Notification message={notification} type="success" onClose={handleCloseNotification}/>}
        {error && <Notification message={error} type="error" onClose={handleCloseNotification}/>}

        <div className='box-title'>
            <div className='icon'>
                <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#229799">
                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
                </svg>
            </div>
            <h2><span>{bookingId ? 'Update' : 'New'}</span> Booking</h2>
            </div>
            <form className="box-form-booking" id="bookingForm" onSubmit={handleSubmit(onSubmit)}>               
                <div>
                    <h3>Selecciona el evento sobre el que quieres realizar la reserva: </h3>

                    <div className="f-box-events">
                        {events.map(eventName => (
                            <label>
                                <div className="f-booking-item">
                                    <input type="radio" value={eventName} {...register("event")} />
                                    {eventName}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                        <Button text="Guardar" color="dark" type="submit"/>
                </div>
            </form>

    </div>
  )
};

export default FormBooking;
