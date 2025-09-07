import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: Date | string | undefined): string => {
  if(!date) return "Sin fecha";
  const dateToFormat = typeof date === 'string' ? new Date(date) : date;
  return format(dateToFormat, 'dd-MM-yyyy', { locale: es });
};