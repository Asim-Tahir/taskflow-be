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
    }
  }
}

export {};
