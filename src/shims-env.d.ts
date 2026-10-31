declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      /**
       * Port the server listens on.
       */
      PORT: `${number}`;
      /**
       * Application runtime environment.
       */
      NODE_ENV: "development" | "production" | "test";

      /**
       * Cloudflare account id
       */
      CLOUDFLARE_ACCOUNT_ID: string;
      /**
       * Cloudflare D1 database id
       */
      CLOUDFLARE_D1_DATABASE_ID: string;
      /**
       * Cloudflare API token for D1
       */
      CLOUDFLARE_D1_API_TOKEN: string;
    }
  }
}

export {};
