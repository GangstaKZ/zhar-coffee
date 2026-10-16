import { z } from 'zod';

export const bookingSchema = z.object({
  name: z
    .string({ required_error: 'Укажите имя' })
    .trim()
    .min(2, 'Имя — минимум 2 символа')
    .max(80, 'Слишком длинное имя'),
  phone: z
    .string({ required_error: 'Укажите телефон' })
    .regex(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, 'Формат: +7 (7XX) XXX-XX-XX'),
  date: z
    .string({ required_error: 'Выберите дату' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Некорректная дата'),
  time: z
    .string({ required_error: 'Выберите время' })
    .regex(/^\d{2}:\d{2}$/, 'Некорректное время'),
  guests: z.coerce
    .number({ invalid_type_error: 'Укажите число гостей' })
    .int('Число гостей — целое')
    .min(1, 'Минимум 1 гость')
    .max(12, 'Максимум 12 гостей'),
  comment: z.string().max(300, 'Комментарий — до 300 символов').optional().or(z.literal('')),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const bookingFieldErrors: Partial<Record<keyof BookingInput, string>> = {
  name: 'Укажите имя (от 2 символов)',
  phone: 'Формат телефона: +7 (7XX) XXX-XX-XX',
  date: 'Выберите дату визита',
  time: 'Выберите время',
  guests: 'От 1 до 12 гостей',
  comment: 'Комментарий — до 300 символов',
};
