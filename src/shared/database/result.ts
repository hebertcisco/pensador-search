import Dexie, { Table } from 'dexie';

import { IResult } from '@/shared/interfaces/result.interface';

export class ResultClassedDexie extends Dexie {
  result!: Table<IResult>;

  constructor() {
    super('resultDatabase');
    this.version(1).stores({
      result: '++id, total, termoDePesquisa, frases',
    });
  }
}

export const dbResult = new ResultClassedDexie();
