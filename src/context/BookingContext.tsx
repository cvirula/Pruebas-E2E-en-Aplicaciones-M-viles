import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Professional, Service } from '../data';

export type Appointment = {
  id: string;
  service: Service;
  professional: Professional;
  date: string;
  time: string;
  status: 'confirmada' | 'cancelada';
};

type BookingContextValue = {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => Appointment;
  cancelAppointment: (id: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const value = useMemo<BookingContextValue>(() => ({
    appointments,
    addAppointment: (appointment) => {
      const created: Appointment = { ...appointment, id: String(Date.now()), status: 'confirmada' };
      setAppointments((current) => [created, ...current]);
      return created;
    },
    cancelAppointment: (id) => {
      setAppointments((current) => current.map((item) => item.id === id ? { ...item, status: 'cancelada' } : item));
    },
  }), [appointments]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBookings debe usarse dentro de BookingProvider');
  return context;
}
