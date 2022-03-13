import { IResult } from '@/shared/interfaces/result.interface';

export interface HookDataProviderInterface {
  results?: IResult;
  setResults?: (data: IResult) => void;
  handleSearch: (term: string) => Promise<IResult>;
}
