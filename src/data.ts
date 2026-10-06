export type Service = {
  id: string;
  name: string;
  duration: string;
  price: string;
  icon: string;
  color: string;
};

export type Professional = {
  id: string;
  name: string;
  role: string;
  initials: string;
  rating: string;
};

export const services: Service[] = [
  { id: 'consulta', name: 'Consulta general', duration: '45 min', price: '$35', icon: 'medical-outline', color: '#E3F1EB' },
  { id: 'masaje', name: 'Masaje relajante', duration: '60 min', price: '$48', icon: 'leaf-outline', color: '#FCE7DE' },
  { id: 'terapia', name: 'Terapia física', duration: '50 min', price: '$42', icon: 'body-outline', color: '#E8E8F7' },
];

export const professionals: Professional[] = [
  { id: 'sofia', name: 'Sofía Herrera', role: 'Especialista integral', initials: 'SH', rating: '4.9' },
  { id: 'marco', name: 'Marco Ruiz', role: 'Fisioterapeuta', initials: 'MR', rating: '4.8' },
  { id: 'any', name: 'Cualquier especialista', role: 'Primera disponibilidad', initials: '✓', rating: 'Rápido' },
];

export function getNextDays() {
  const labels = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    return {
      id: String(index + 1),
      day: labels[date.getDay()],
      number: String(date.getDate()),
      long: `${labels[date.getDay()].toLowerCase()}, ${date.getDate()} de ${months[date.getMonth()]}`,
    };
  });
}

export const timeSlots = ['09:00', '10:30', '12:00', '15:30', '17:00'];
