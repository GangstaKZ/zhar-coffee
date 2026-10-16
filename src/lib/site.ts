export const site = {
  name: 'ЖАР',
  nameFull: 'ЖАР — specialty coffee',
  tagline: 'Спешиалти-кофейня в Астане',
  description:
    'ЖАР — спешиалти-кофейня в Астане: эспрессо-бар, фильтр, альтернатива на свежей обжарке. Меню, карта и бронь столика онлайн.',
  address: 'Астана, ул. Достык 16, 1 этаж',
  addressShort: 'ул. Достык, 16',
  phone: '+7 (747) 550-05-05',
  phoneHref: '+77475500505',
  hours: 'Пн–Пт 8:00–22:00 · Сб–Вс 9:00–23:00',
  hoursSpec: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '22:00' },
    { days: ['Saturday', 'Sunday'], opens: '09:00', closes: '23:00' },
  ],
  coords: { lat: 51.128, lng: 71.43 } as const,
  social: {
    instagram: 'https://instagram.com/',
    telegram: 'https://t.me/',
  },
  mapUrl: 'https://go.2gis.com/',
} as const;

export const navLinks = [
  { href: '#menu', label: 'Меню' },
  { href: '#about', label: 'История' },
  { href: '#map', label: 'Карта' },
] as const;
