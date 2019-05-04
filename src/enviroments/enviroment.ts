// TODO: string is needed because the prod file replace replaces with string value
// to be replaced at build time.
export interface Enviroment {
  production: boolean | string;
}
