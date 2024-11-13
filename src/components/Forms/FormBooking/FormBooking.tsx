
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; // Para hacer una redirección

import Button from '../../Button/Button';
import Notification from '../../Notification/Notification';
import BonoUsers from "../../Items/BonoUser/BonoUser";

import { BonoData, EventData, FormBookingProps, UserData } from './types/index';
import { formatDate } from "../../../utils/date";

import './FormBooking.css';

import { newBooking, updateBooking } from "../../../services/apiServicesBookings";
import { getUserToken } from "../../../services/apiServicesUsers";
import { getBonosByUserId } from "../../../services/apiServicesBonos";
import { getEvents } from "../../../services/apiServicesEvents";


const FormBooking = ({
    bookingId,
    initialData,
    onClose
}: FormBookingProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm(); // Formulario
    const navigate = useNavigate(); // Hook para redirigir

    const [bonos, setBonos] = useState<BonoData[] | null>(null);
    const [user, setUser] = useState<UserData | null>(null);
    const [events, setEvents] = useState<EventData[]>([]);

    const [notification, setNotification] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    // Para poder realizar la reserva es necesario cargar previamente la info
    // de usuarios, bonos y eventos

    // Sacamos la info del usuario que se ha identificado del token
    const fetchUserData = async () => {
        const token = localStorage.getItem("token"); // O la manera en que almacenas el token

        if (token) {
            try {
                const userData = await getUserToken(token);
                setUser(userData); // Guarda los datos del usuario en el contexto
                console.log(`El usuario identificado es ${userData.userName}`);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
                setError("No se pudo obtener la información del usuario.");
            }
        }
    };

    const fetchBonos = async () => {
        if (user && user._id) {
          try {
            const bonosData = await getBonosByUserId(user._id); // Llamada al servicio para obtener los bonos
            setBonos(bonosData);
            
            console.log("Bonos asignados al usuario:", bonosData);
      
            if (!bonosData || bonosData.length === 0) {
                setError("No tienes ningún bono disponible para realizar una reserva.");
            }
          } catch (error) {
            console.error("Error fetching bonos:", error);
            setError("Hubo un problema al obtener los bonos del usuario. Por favor, intenta de nuevo.");
          }
        }
      };
      
    
    //fetch al listado de eventos
    const fetchEvents = async () => {
        try {
            const eventsData = await getEvents();
            setEvents(eventsData);
            console.log(eventsData);
        } catch (error: any) {
            setError(error.message || 'Error fetching events');
        }
    };

    //buscamos si el usuario tiene algún bono asignado
    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData();
            await fetchBonos();
            await fetchEvents();
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        if (user) {
            fetchBonos();
        }
    }, [user]);

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
    const onSubmit = useCallback(async (formData: any) => {
        setLoading(true);

        // Verificar los datos antes de enviar
        console.log("Datos del formulario:", formData); 

        // Obtener el `id` del evento y del bono seleccionado
        const { eventId, bonoId } = formData;

        if (!bonoId) {
            console.error("No se seleccionó un bono.");
            setError("Por favor, selecciona un bono antes de continuar.");
            setLoading(false);
            return;
        }

        try {
            const bookingData = {
                eventId,
                bonoId,
                // Otros datos de la reserva, si son necesarios
            };

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
                await newBooking(bookingData);
                setNotification(`Reserva creada correctamente`);

                setTimeout(() => {
                    navigate('/gestion-reservas'); // Redirige después de crear el bono
                }, 2000)               
            }
        
            } catch (error: any) {
                console.error('Error:', error);
                setError(error.message || (bookingId ? 'Error al actualizar la reserva' : 'Error al crear la reserva'));
        } finally {
            setLoading(false);
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
        <div>
            {user && (
                <h3>Te has identificado como {user.userName}. Estos son tus bonos:</h3>
            )}
            <div>
                {bonos ? (
                    bonos.map((bono: any) => (
                        <BonoUsers 
                            key={bono._id}
                            type={bono.type}
                            active={bono.active}
                            reservations={bono.reservations}
                            id={bono._id}
                            expirationDate={formatDate(bono.expirationDate)}
                            name={bono.name}
                            code={bono.code}
                        />
                    ))
                ) : (
                    <p>No tienes bonos disponibles.</p>
                )}
            </div>
        </div>
            <form className="box-form-booking" id="bookingForm" onSubmit={handleSubmit(onSubmit)}>               
                <div>
                    <h3>Selecciona el evento sobre el que quieres realizar la reserva: </h3>
                    <div>
                        {events.map(eventsData => (
                            <label key={eventsData._id}>
                                <div className="f-booking-item">
                                    <input
                                        type="radio"
                                        value={eventsData._id}
                                        {...register("eventId", { required: "Selecciona un evento antes de continuar" })}
                                        style={{ borderColor: errors.type ? "red" : "" }}
                                    />
                                    <p>{eventsData.name} - <span>{formatDate(eventsData.date)}</span></p>
                                    <p style={{color: 'red', visibility: errors.type ? 'visible' : 'hidden'}}>
                                        {errors.eventId && <span>{errors.eventId.message as string}</span>}
                                    </p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
                <h3>Selecciona el bono que deseas utilizar:</h3>
                <div>
                    {bonos ? (
                        bonos.map((bono) => (
                            <div key={bono._id}>
                                <div className="f-booking-item">
                                    <input
                                        type="radio"
                                        id={bono._id}
                                        value={bono._id}
                                        {...register("bonoId", { required: "Debes seleccionar un bono" })}
                                    />
                                    <label htmlFor={bono._id}>
                                        {bono.name} - Código: {bono.code}
                                    </label>
                                    <p style={{color: 'red', visibility: errors.bonoId ? 'visible' : 'hidden'}}>
                                        {errors.bonoId && <span>{errors.bonoId.message as string}</span>}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tienes bonos disponibles.</p>
                    )}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <Button text="Reservar" color="dark" type="submit"/>
                </div>

            </form>

    </div>
  )
};

export default FormBooking;
