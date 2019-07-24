import { Omit } from 'utils/TypeUtils/Omit';

export interface User {
  id: string;
  email: string;
}

export type UserNew = Omit<User, 'id'>;
