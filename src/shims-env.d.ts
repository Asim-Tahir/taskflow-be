declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: `${number}`;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
