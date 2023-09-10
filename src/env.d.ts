/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly FIREBASE_PRIVATE_KEY_ID: string;
  readonly FIREBASE_PRIVATE_KEY: string;
  readonly FIREBASE_PROJECT_ID: string;
  readonly FIREBASE_CLIENT_EMAIL: string;
  readonly FIREBASE_CLIENT_ID: string;
  readonly FIREBASE_AUTH_URI: string;
  readonly FIREBASE_TOKEN_URI: string;
  readonly FIREBASE_AUTH_CERT_URL: string;
  readonly FIREBASE_CLIENT_CERT_URL: string;

  readonly POSTGRES_URL: string;
  readonly POSTGRES_PRISMA_URL: string;
  readonly POSTGRES_URL_NON_POOLING: string;
  readonly POSTGRES_USER: string;
  readonly POSTGRES_HOST: string;
  readonly POSTGRES_PASSWORD: string;
  readonly POSTGRES_DATABASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
