import { BaseModel } from './base';

export interface Phone extends BaseModel {
  number: string;
  description: string;
}
