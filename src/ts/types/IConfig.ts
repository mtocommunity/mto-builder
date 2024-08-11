export interface IConfig {
  DISCORD: {
    TOKEN: string;
  };
  HTTP: {
    PORT: number;
  };
  DB: {
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    DATABASE: string;
  };
}
