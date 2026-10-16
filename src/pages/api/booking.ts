import type { APIRoute } from 'astro';
import { bookingSchema } from '../../lib/booking-schema';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  const token = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  // Honeypot: silently pretend success
  if (payload.company_url) {
    return json({ ok: true });
  }

  // Anti-bot: submitted suspiciously fast (real form always sends _t)
  const t = Number(payload._t);
  if (Number.isFinite(t) && Date.now() - t < 1500) {
    return json({ ok: true });
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { ok: false, error: parsed.error.flatten().fieldErrors },
      400,
    );
  }

  const { name, phone, date, time, guests, comment } = parsed.data;

  if (!token || !chatId) {
    console.warn('[booking] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set — logging only');
    console.info('[booking]', { name, phone, date, time, guests, comment });
    return json({ ok: true });
  }

  const text = [
    '<b>🪑 Новая бронь — ЖАР</b>',
    '',
    `<b>Имя:</b> ${name}`,
    `<b>Телефон:</b> ${phone}`,
    `<b>Дата:</b> ${date}`,
    `<b>Время:</b> ${time}`,
    `<b>Гостей:</b> ${guests}`,
    comment ? `<b>Комментарий:</b> ${comment}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error('[booking] telegram error', res.status, detail);
      return json({ ok: false, error: 'Telegram delivery failed' }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('[booking] fetch failed', err);
    return json({ ok: false, error: 'Network error' }, 502);
  }
};
