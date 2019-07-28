import { Omit } from 'utils/Type/Omit';

export interface User {
  id: string;
  email: string;
}

export type UserNew = Omit<User, 'id'>;
