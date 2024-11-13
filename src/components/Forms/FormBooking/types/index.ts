export interface UserData {
    _id: string;
    userName: string;
    email: string;
    rol: string;
}

export interface BonoData {
    _id: string;
    name: string;
    type: string,
    active: boolean,
    code: string,
    user?: UserData;
    totalUses: number,
    availableUses: number,
    expirationDate?: string,
}

export interface EventData {
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

export interface FormBookingProps {
    bookingId?: string;
    initialData?: BookingData;
    onClose?: () => void;
}
