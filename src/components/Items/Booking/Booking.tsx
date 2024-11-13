import { memo, useCallback } from 'react';

import Notification from '../../Notification/Notification.js';
import { AdminBoxButtons } from '../../AdminBoxButtons/AdminBoxButtons.js';

// import Modal from '../../Modal/Modal.js';

import './Booking.css';

import useCommonReducer from '../../../reducers/useCommonReducer.js';

import { deleteBooking } from '../../../services/apiServicesBookings.js';
import FormBooking from '../../Forms/FormBooking/FormBooking.js';
import Modal from '../../Modal/Modal.js';


interface Bono {
    _id: string;
    name: string;
    type: string;
    active: boolean;
    code: string;
}

interface Events {
    _id: string;
    name: string;
    description?: string;
    date: string;
    hour: number;
    capacity?: number;
}

export interface BookingProps {
    _id: string;
    localizador: string;
    eventos: Events[];
    bono?: Bono[];
    refreshBookings: () => void; //funcion que se nos pasa desde userList
}

const Booking = memo (({
    _id,
    localizador,
    eventos= [],
    bono= [],
    refreshBookings,
}: BookingProps): JSX.Element => {
    const {
        state,
        setError,
        setNotification,
        showModal,
        hideModal,
        clearMessages,
      } = useCommonReducer();

    const handleDeleteBooking = useCallback(async () => {
        try {
            const response = await deleteBooking(_id);
            const message = response.message;
            setNotification(message || `Reserva eliminada correctamente`);
        
        setTimeout(() =>{
            clearMessages();
            refreshBookings();  // Llama a refreshBonos después de eliminar
            }, 3000);
            
        } catch (error: any) {
            console.error('Error deleting booking:', error);
            setError(error.message || 'Error deleting booking');
        }
    }, [_id, clearMessages, refreshBookings, setNotification, setError]);

    const handleUpdateBooking= useCallback(() => {
        showModal()
    }, [showModal]);

    const handleCloseModal = () => {
        hideModal(); // cerrar el modal
        refreshBookings();
    };

    return (
        <div className='c-booking'>

            {state.error && <Notification message={state.error} type="error" onClose={clearMessages} />}
            {state.notification && <Notification message={state.notification} type="success" onClose={clearMessages} />}
            
            <div className="box-booking" key={_id}>
                <div className='info-booking'>
                    <div className='txt'>
                        <h3>{localizador}</h3>
                        <p className='id'>ID: <span>{_id}</span></p>
                    </div>
                </div>
                <div className="bonos-list">
                    <h3>Bono asociado:</h3>
                    {bono && bono.length === 0 ? (
                        <p>No hay bonos disponibles para este usuario.</p>
                    ) : (
                        bono.map(b => (
                            <div key={b._id} className="bono-item">
                                <h4>{b.name}</h4>
                                <p>Activo: {b.active ? 'Sí' : 'No'}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="event-list">
                    <h3>Evento asociado:</h3>
                    {eventos && eventos.length === 0 ? (
                        <p>No hay bonos disponibles para este usuario.</p>
                    ) : (
                        eventos.map(event => (
                            <div key={event._id} className="bono-item">
                                <h4>{event.name}</h4>
                                <p>{event.date}</p>
                            </div>
                        ))
                    )}
                </div>
                <AdminBoxButtons
                    handleUpdate={handleUpdateBooking}
                    handleDelete={handleDeleteBooking}
                />
            </div>
            {state.showModal && (
                <Modal showModal={state.showModal} onCloseModal={handleCloseModal}>
                    <FormBooking
                        bookingId={_id}
                        onClose={handleCloseModal}// Prop para cerrar el formulario
                        initialData={{
                            _id: _id,
                            localizador: localizador,
                            eventos:eventos,
                            bono: bono,
                        }}
                    />
                </Modal>
            )}
        </div>
    );
});

export default Booking;