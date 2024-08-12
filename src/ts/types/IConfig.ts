export interface IConfig {
  BUILD_PROCESS: {
    MAX_TIME: number; // Minutes
  };
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
