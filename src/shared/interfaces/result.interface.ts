export interface IPhrases {
  autor: string;
  texto: string;
}
export interface IResult {
  total: number;
  termoDePesquisa: string;
  frases: IPhrases[];
}
