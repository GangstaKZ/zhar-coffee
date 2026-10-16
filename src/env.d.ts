/// <reference types="astro/client" />

type ImportMetaEnv = {
  readonly TELEGRAM_BOT_TOKEN?: string;
  readonly TELEGRAM_CHAT_ID?: string;
  readonly PUBLIC_DGIS_KEY?: string;
  readonly PUBLIC_SITE_URL?: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
