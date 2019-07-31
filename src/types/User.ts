import { Omit } from 'types/util/Omit';

export interface User {
  id: string;
  email: string;
}

export type UserNew = Omit<User, 'id'>;
