declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    NEXT_PUBLIC_GITHUB_URL: string;
    JWT_SECRET: string;
    ACCESS_TOKEN_EXPIRATION: number;
    REFRESH_TOKEN_EXPIRATION: number;
  }
}
